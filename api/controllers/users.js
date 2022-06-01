import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc; // use destructuring to get everything but password from mongoDB document
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // finds every user
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  if (req.body.password) {
    //encrypt password for if user updates password
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // findByIdAndUpdate is a mongodb method to update
        $set: req.body, // set everything in the request body
      },
      { new: true } // to return updated user
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
