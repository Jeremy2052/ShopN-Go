const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

//update
//middleware to verify token
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
  //since user can update and change password, check password again
  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
  }
  //update user
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },{new:true}); //return new updated user
    res.status(200).json(updatedUser);
  }catch(err){
    res.status(500).json(err)
  }
})

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res) => {
  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted sucessfully")
  }catch(err){
    res.status(500),json(err)
  }
});

//Get user
router.get("/find/:id", verifyTokenAndAdmin, async (req,res) => {
  try{
    const user = await User.findById(req.params.id);

    const {password, ...others} = user._doc;
    
    res.status(200).json(others)
  }catch(err){
    res.status(500),json(err)
  }
});

//Get all users
router.get("/", verifyTokenAndAdmin, async (req,res) => {
  const query = req.query.new;
  try{
    const users = query ?  await User.find().sort({_id:-1}).limit(5) : await User.find();
    res.status(200).json(users)
  }catch(err){
    res.status(500),json(err)
  }
});

//Get use stats
router.get("/stats", verifyTokenAndAdmin, async (req,res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  //grab stats of createdAt from each user and aggregate them
  try{
    const data = await User.aggregate([
      {$match:{createdAt: {$gte:lastYear}}},
      //grab the month
      {
        $project:{
          month:{$month:"$createdAt"}
        }
      },
      {
        $group:{
          _id:"$month",
          total:{$sum:1}
        }
      }
    ]);
    res.status(200).json(data)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;