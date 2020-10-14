module.exports = {
  async home(req, res) {
    res.send({ ok: true, user: req.userId });
  },
};
