const generalControllter = {
  async ping(req, res) {
    try {
      res.status(200).json({ message: "pong" });
    } catch (error) {
      res.status(400).json({ error, message: error.message });
    }
  },
};

export default generalControllter;
