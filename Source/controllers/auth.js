const User = require("../models/User");

module.exports = {
  async register(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email }))
        return res.status(200).send({ error: "Usuario já existe" });

      const user = await User.create(req.body);
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(400).send({ error: "Erro ao criar" + error });
    }
  },
};
