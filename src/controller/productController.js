const path = require("path");
const helper = require("../helpers/productHelper");
const productsFilePath = path.join(__dirname, "../database/products.json");
const userHelper = require("../helpers/userHelper");

// Create a new product
exports.productCreate = (req, res) => {
  try {
    const userId = req.params.id;
    const newProduct = req.body;
    const {name ,price,...rest} = req.body
    if(Object.keys(rest).length >0)return res.status(400).send({message:"please provided only valid details"})
    if(!name)return res.status(400).send({message:"product name required"})
    if(!price)return res.status(400).send({message:"product price required"})

    const checkId = userHelper.findUserById(userId);
  
    if (!checkId) return res.status(400).send({ message: "user id not exist" });
    if (checkId.role != "admin")
      return res
        .status(400)
        .send({ message: `only admin add product your role ${checkId.role}` });
    newProduct.seller = checkId.name;
    const createdProduct = helper.createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Update an existing product

exports.updateProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const updatedProduct = req.body;

    const {name ,price,...rest} = req.body
    if(Object.keys(rest).length >0)return res.status(400).send({message:"please provided only valid details"})

    updatedProduct.id = productId;
    const result = helper.updateProduct(updatedProduct);

    if (result == false)
      return res.status(400).send({ message: "Product not found" });
    
    if (result) {
      return res.status(200).json({ data :result });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Get a list of products
exports.getProduct = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;

    const products = helper.readProductsData();
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);
      return res.status(200).json({data :paginatedProducts });

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Delete a product

exports.deleteProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const deletedProduct = helper.ProductDelete(productId);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    return res.status(200).json({ error: "Product delete successful" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
