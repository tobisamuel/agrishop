import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // get one user from db
    !user && res.status(401).json("Wrong credentials"); // username conditional

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ); //decrypt password to use in conditional
    const inputedPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // convert to utf8
    inputedPassword !== req.body.password &&
      res.status(401).json("Wrong credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    ); //create web token after successful login

    const { password, ...others } = user._doc; //use destructuring to get everything but password from mongoDB document

    return res.status(201).json({ ...others, accessToken }); //json response
  } catch (error) {}
};
