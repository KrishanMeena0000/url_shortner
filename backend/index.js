const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./db");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");
const cors = require('cors')

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

connectToMongoDB(process.env.DATABASE_URL).then(() =>
  console.log("Mongodb connected")
);


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // <-- Use an environment variable
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api", restrictToLoggedinUserOnly, urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
