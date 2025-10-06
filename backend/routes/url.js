const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
  listUrls,
} = require("../controllers/url");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

const router = express.Router();
// router.use(restrictToLoggedinUserOnly);  

router.post("/urls", restrictToLoggedinUserOnly, handleGenerateNewShortURL);
router.get('/urls', restrictToLoggedinUserOnly, listUrls)
router.delete('/urls/:id', restrictToLoggedinUserOnly, handleDeleteUrl)


router.get("/urls/:shortId/analytics", restrictToLoggedinUserOnly, handleGetAnalytics);

module.exports = router;
