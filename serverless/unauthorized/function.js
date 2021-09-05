
exports.helloGET = (req, res) => {
  res.send(process.env.MESSAGE);
};
