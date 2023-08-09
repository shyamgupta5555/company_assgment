const router = require("express").Router()
const {createUser} = require("../controller/userController")
const {productCreate,updateProduct,getProduct,deleteProduct} =require("../controller/productController")
const {createCart ,removeItem ,addItem,getCart,deleteItem} =require("../controller/cartController")
const {createOrder ,getOrder} = require("../controller/orderContorller")
const { createAddress , updateAddress,getAddress } = require("../controller/addressController")

// user

router.post("/register" ,createUser)

// products 
router.post("/createProduct/:id" ,productCreate)
router.put("/updateProduct/:productId" ,updateProduct)
router.delete("/deleteProduct/:productId" ,deleteProduct)
router.get("/getProduct",getProduct)

// cart 

router.post("/createCart/:id" , createCart)

router.get("/getCart/:cartId" ,getCart)

router.put("/removeItem/:cartId" ,removeItem)

router.put("/addItem/:cartId" ,addItem)

router.delete("/deleteCart/:cartId" ,deleteItem)


// order
router.post("/createOrder/:cartId" , createOrder)
router.get("/getOrder/:orderId" ,getOrder )


// address route

router.post("/address/:userId" ,createAddress)
router.put("/addressUpdate/:addressId" ,updateAddress)
router.get("/addressGet/:addressId" , getAddress)




module.exports = router