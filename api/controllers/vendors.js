import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";

// REGISTER NEW VENDOR
export const registerVendor = async (req, res) => {
  const newVendor = new Vendor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    businessName: req.body.businessName,
    businessAddress: req.body.businessAddress,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ),
  });

  try {
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// LOGIN
export const loginVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ email: req.body.email }); // get one user from db (email is unique)
    !vendor && res.status(401).json("Wrong credentials"); // email conditional

    const hashedPassword = CryptoJS.AES.decrypt(
      vendor.password,
      process.env.PASSWORD_SECRET
    ); //decrypt password to use in conditional
    const inputedPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // convert to utf8
    inputedPassword !== req.body.password &&
      res.status(401).json("Wrong credentials");

    const accessToken = jwt.sign(
      {
        id: vendor._id,
        businessName: vendor.businessName,
        approved: vendor.approved,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    ); // create web token after successful login

    const { password, ...others } = vendor._doc; //use destructuring to get everything but password from mongoDB document

    res.status(201).json({ ...others, accessToken }); //json response
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editVendor = async (req, res) => {
  if (req.body.password) {
    //encrypt password for if user updates password
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        // findByIdAndUpdate is a mongodb method to update
        $set: req.body, // set everything in the request body
      },
      { new: true } // to return updated user
    );
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
