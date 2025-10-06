const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./db");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");
const cors = require('cors')

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // <-- Use an environment variable
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api", restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
