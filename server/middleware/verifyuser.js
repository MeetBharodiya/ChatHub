const jwt = require("jsonwebtoken");

const verifyuser = (req, res, next) => {
  const token=req.cookies.jwt;
  if(!token)
  {
    res.status(401).json({error:"Please login again!!"})
  }
  try {
    const data = jwt.verify(token,process.env.SIGN);
    req.id=data.id;
    next();
  } catch (error) {
    // res.clearCookie('jwt').json({ message: 'Token removed' });
    res.status(401).json({error:"please authenticate vadild token"})
  }
};  

module.exports = verifyuser;
