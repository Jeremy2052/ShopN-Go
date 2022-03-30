const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

//Create product
router.post("/", verifyToken, async (req,res) => {
  const newCart = new Cart(req.body);
  try{
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }catch(err){
    res.status(500).json(err)
  }
})

//update
//middleware to verify token
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
  //update product
  try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },{new:true}); //return new updated Cart
    res.status(200).json(updatedCart);
  }catch(err){
    res.status(500).json(err)
  }
})

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req,res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted sucessfully")
  }catch(err){
    res.status(500),json(err)
  }
});

//Get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res) => {
  try{
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart)
  }catch(err){
    res.status(500),json(err)
  }
});

//Get all users carts
router.get("/", verifyTokenAndAdmin, async (req,res) => {
  try{
    const carts = await Cart.find();
    res.status(200).json(carts)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;