const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split("")[1];
  console.log(token);
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log(_id);

    req.user = await User.find({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(token);

    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
