import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const newOrder = new Order({
    userId: req.body._id,
    products: req.body.filteredProducts,
    amount: req.body.total,
    address: req.body.address,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Order.find({ userid: userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        // findByIdAndUpdate is a mongodb method to update
        $set: req.body, // set everything in the request body
      },
      { new: true } // to return updated Product
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
