const path = require("path");
const cartHelper = require("../helpers/cartHelper");
const orderHelper = require("../helpers/orderHelper");
const productHelper = require("../helpers/productHelper");
const ordersFilePath = path.join(__dirname, "../database/carts.json");

exports.createOrder = (req, res) => {
  try {
    const cartId = req.params.cartId;

    const checkCartId = cartHelper.findCartById(cartId.toString());
    if (!checkCartId)
      return res.status(404).send({ message: "cart id not found" });

    let total = 0;

    let len = checkCartId.products.length;

    for (let i = 0; i < len; i++) {
      const productId = productHelper.findProductById(
        checkCartId.products[i].productId
      );

      if (!productId)
        return res
          .status(400)
          .send({
            message: `product id ${checkCartId.products.productId} not exist`,
          });
      let sum = checkCartId.products[i].quantity * productId.price;
      total += sum;
    }

    checkCartId.total = total.toFixed(3);
    const createdOrder = orderHelper.createOrder(checkCartId);

    cartHelper.deleteCart(cartId.toString());
    
    return res.status(201).json(createdOrder);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getOrder = (req, res) => {
  try {
    const id = req.params.orderId
    
    const index = orderHelper.findOrderById(id);
    if (!index) return res.status(400).send({ message: "not found order id" });
     return res.status(200).send({ index : index });

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
