module.exports = (req, res, next) => {
  if (req.url === "/signin" && req.method === "POST") {
    res.status(200).json({ access_token: "access_token_data" });
  } else {
    if (req.headers["authorization"]) {
      console.log(req.headers["authorization"]);
    }
    next();
  }
};
