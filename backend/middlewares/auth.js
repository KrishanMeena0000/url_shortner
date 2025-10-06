// In backend/middlewares/auth.js

const { getUser } = require('../service/auth');
const User = require('../models/user'); // <-- 1. Import your User model

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.status(401).json({ message: "Unauthorized. No session found." });
  }

  // This part looks up the session ID in your temporary map
  const sessionUser = getUser(userUid);

  if (!sessionUser) {
    return res.status(401).json({ message: "Unauthorized. Invalid session." });
  }

  // 2. Add this step to get fresh user data from the database
  try {
    const userFromDb = await User.findById(sessionUser._id);
    if (!userFromDb) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    // 3. Attach the REAL user object from the database to the request
    req.user = userFromDb;
    next();
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    return res.status(500).json({ message: "Server error during authentication." });
  }
}

// The checkAuth function is not needed for your API and can be removed, 
// but we can leave it for now to avoid breaking anything else.
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user || null;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth
};