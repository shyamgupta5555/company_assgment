const path = require("path");
const userHelper = require("../helpers/userHelper");
const productHelper = require("../helpers/productHelper");
const cartHelper = require("../helpers/cartHelper");

const cartsFilePath = path.join(__dirname, "../database/carts.json");

// Create a new cart

exports.createCart = (req, res) => {
  try {
    const newCart = req.body;
    const userId = req.params.id;
    const { products, ...rest } = req.body;

    if (Object.keys(rest).length > 0)
      return res
        .status(400)
        .send({ message: "please provided only valid details" });

    const checkId = userHelper.findUserById(userId);
    if (!checkId) return res.status(400).send({ message: "user id not exist" });
    newCart.userId = checkId.id;

    const card = cartHelper.findUserById(userId);
    if (card)
      return res
        .status(400)
        .send({ message: `use update api already create cart id ${card.id}` });

    if (!newCart.products)
      return res.status(400).send({ message: "products is required " });
    if (!Array.isArray(newCart.products))
      return res.status(400).send({ message: "products add inside array" });

    let len = newCart.products.length;
    for (let i = 0; i < len; i++) {
      const productId = productHelper.findProductById(
        newCart.products[i].productId
      );
      if (!productId)
        return res.status(400).send({
          message: `product id ${newCart.products.productId} not exist`,
        });
    }

    const createdCart = cartHelper.createCart(newCart);
    res.status(201).json(createdCart);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Update an existing cart
exports.addItem = (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);

    const { productId, quantity, ...rest } = req.body;
    if (Object.keys(rest).length > 0)
      return res
        .status(400)
        .send({ message: "please provided only valid details" });

    if (!productId)
      return res.status(400).send({ message: "products is required " });

    const carts = cartHelper.findCartById(cartId);
    if (!carts) return res.status(400).send({ message: "not found carts id" });

    /// =================

    let indexToAdd = carts.products.findIndex(
      (cart) => cart.productId == productId
    );
  
    if (indexToAdd != -1) {
      carts.products[indexToAdd].quantity =
        carts.products[indexToAdd].quantity + quantity;
    }else{
      const product = productHelper.findProductById(productId);
      if (!product)
        return res.status(400).send({
          message: `product id ${productId} not exist`,
        });

      carts.products.push(req.body);
    }

    const result = cartHelper.updateCart(carts);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.removeItem = (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);

    const { productId, ...rest } = req.body;
    if (Object.keys(rest).length > 0)
      return res
        .status(400)
        .send({ message: "please provided only valid details" });

    if (!productId)
      return res.status(400).send({ message: "products is required " });

    const carts = cartHelper.findCartById(cartId);
    if (!carts) return res.status(400).send({ message: "not found carts id" });

    /// =================

    const indexToRemove = carts.products.findIndex(
      (cart) => cart.productId === productId
    );
    

    if (indexToRemove != -1) {
      carts.products.splice(indexToRemove, 1);
    } else {
      return res.status(400).send({ message: "products not found" });
    }

    const result = cartHelper.updateCart(carts);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Get a list of carts

exports.getCart = (req, res) => {
  try {
    const { cartId } = req.params;
    const carts = cartHelper.findCartById(cartId);
    if (!carts) return res.status(400).send({ message: "not found carts id" });
    res.status(200).json(carts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Delete a cart
exports.deleteItem = (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const deletedCart = cartHelper.deleteCart(cartId);

    if (deletedCart) {
      res.status(404).json({ message: "delete  successfully " });
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
