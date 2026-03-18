module.exports = (req,res,next)=>{

    console.log(req.user)
  const email = req.user.email;

  if(email !== "admin@gmail.com"){
    return res.status(403).json({
      message:"Admin access required"
    });
  }

  next();

};