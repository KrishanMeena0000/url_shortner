const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { longUrl, customAlias } = req.body;
  if (!longUrl) return res.status(400).json({ error: "url is required" });
  const shortID = customAlias && customAlias.trim() !== "" ? customAlias : shortid.generate();

  try {
    const newUrl = await URL.create({
      shortId: shortID,
      redirectURL: longUrl,
      visitHistory: [],
      createdBy: req.user._id,
    });
    
    return res.json(newUrl);

  } catch (e) {
    // Check if the error is a duplicate key error
    if (e.code === 11000) {
      return res.status(409).json({ error: "Alias is already in use. Please choose another." });
    }

    // For all other errors, send a generic 500 error
    console.error("ERROR CREATING URL:", e);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(404).json({ error: "Short URL not found" })
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function listUrls(req, res) {
  try {
    const urls = await URL.find({ createdBy: req.user._id }); // Assuming user-specific URLs
    res.json(urls); // Return array of URLs
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
async function handleDeleteUrl(req, res) {
  try {
    const { id } = req.params;
    const result = await URL.findOneAndDelete({ _id: id, createdBy: req.user._id });

    if (!result) {
      return res.status(404).json({ error: "URL not found or you do not have permission to delete it." });
    }

    return res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("DELETE URL ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
  listUrls,
};
