const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    console.log("Hello from auth");

    const token = req.cookies["lhr"];
    console.log("🦩 ~ module.exports= ~ token", token);

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("🦩 ~ module.exports= ~ decoded", decoded);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("~ auth error", error.message);

    res.send({ success: false, error: error.message });
  }
};
