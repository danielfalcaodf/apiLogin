const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: "o token não foi informando " });
  //// beare ldkfsadnflaflsfbaba5465

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token formato errado" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalido" });
    req.userId = decoded.id;
    return next();
  });
};
