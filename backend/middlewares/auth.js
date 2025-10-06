const { setUser,getUser } = require('../service/auth')
async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.status(401).json({ message: "Unauthorized. No session found." });
  }

  const user = await getUser(userUid);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized. Invalid session." });
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = await getUser(userUid);
  req.user = user || null;
  next();
}
module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth
}