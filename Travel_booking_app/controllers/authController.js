const User = require("../models/User");

// SIGNUP
/*exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Signup Successful ✔" });
  } catch (err) {
    res.status(500).json({ error: "Signup Error ❌" });
  }
};*/


exports.signup = async (req, res) => {
  try {
    console.log("SIGNUP HIT:", req.body);

    const user = new User(req.body);
    const saved = await user.save();

    console.log("USER SAVED:", saved);

    res.json({ message: "Signup Successful", user: saved });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Signup failed" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    //const user = await User.findOne(req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials ❌" });
    }

    res.json({ message: "Login Successful ✔", user });
  } catch (err) {
    res.status(500).json({ error: "Login Error ❌" });
  }
};