const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: false });

    return res.status(201).json({
      message: "User registered Successfully",
      user: { _id: user._id, email: user.email, fullName: user.fullName },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const users = await UserModel.find({ email });

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    let authenticatedUser = null;

    for (const user of users) {
      if (!user.password) continue;
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        authenticatedUser = user;
        break;
      }
    }

    // 1. If password didn't match any account
    if (!authenticatedUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. CRITICAL: You were missing the response here!
    const token = jwt.sign(
      { id: authenticatedUser._id },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, { httpOnly: false });

    // 3. This is what stops Postman from spinning
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: authenticatedUser._id,
        email: authenticatedUser.email,
        fullName: authenticatedUser.fullName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

//for food partner model
const FoodPartnerModel = require("../models/foodPartner.model.js");
const foodPartnerModel = require("../models/foodPartner.model.js");

const registerFoodPartner = async (req, res) => {
  const { name, email, password, phone, address, contactName } = req.body;

  const accountAlreadyExists = await FoodPartnerModel.findOne({ email });

  if (accountAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await FoodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    contactName,
    address,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "Register successful",
    user: {
      _id: foodPartner._id,
      email: foodPartner.email,
      fullName: foodPartner.name,
      address,
      phone,
      contactName,
    },
  });
};

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.json({ message: "User doesnt exist" });
  }

  const isValidPw = await bcrypt.compare(password, foodPartner.password);

  if (!isValidPw) {
    return res.json({ message: "invalid credentials " });
  }

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    user: {
      _id: foodPartner._id,
      email: foodPartner.email,
      fullName: foodPartner.name,
    },
  });
};

const logoutFoodPartner = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
