const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs"); // hash passwords

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      message: "Signup successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Signup failed" });
  }
}

async function handleUserLogin(req, res) {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create session (if needed) or send JWT
    const sessionId = uuidv4();
    await setUser(sessionId, user);

    // Send JSON instead of redirect
    res.cookie("uid", sessionId, { httpOnly: true });
    console.log("Login response:", { token: sessionId, user });
    console.log("Sending JSON response with:", {
  token: sessionId,
  user: { id: user._id, name: user.name, email: user.email }
});

    return res.json({
      // token: sessionId,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
}

module.exports = {handleUserLogin,handleUserSignup};
