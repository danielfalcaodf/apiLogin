const User = require("../models/User");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

generateToken = (param = {}) => {
  return jwt.sign(param, authConfig.secret, {
    expiresIn: 86400,
  });
};
module.exports = {
  async register(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ where: { email } })) {
        return res.status(200).send({ error: "Usuario já existe" });
      }

      const user = await User.create(req.body);
      user.passwd = undefined;
      return res
        .status(200)
        .send({ user, token: generateToken({ id: user.id }) });
    } catch (error) {
      return res.status(400).send({ error: "Erro ao criar " + error });
    }
  },
  async Authenticate(req, res) {
    const { email, passwd } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).send({ error: "Usuario não encontrado" });
    if (!(await bcript.compareSync(passwd, user.passwd)))
      return res.status(400).send({ error: "Email ou senha invalido  " });
    user.passwd = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });
  },
};
