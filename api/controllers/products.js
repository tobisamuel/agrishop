import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    vendor: req.body.vendor,
    price: req.body.price,
    img: req.body.img,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category; // query for category
  const qBusinessName = req.query.businessName;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(6);
    } else if (qBusinessName) {
      products = await Product.find({ businessName: qBusinessName }); // conditional for category query
    } else if (qCategory) {
      products = await Product.find({ category: qCategory }); // conditional for category query
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getVendorProducts = async (req, res) => {
  const businessName = req.user.businessName;
  try {
    const products = await Product.find({ vendor: businessName });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
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

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
