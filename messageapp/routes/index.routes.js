const router = require("express").Router();
const ApiHandler = require('./../services/message.service')

const messageHandler = new ApiHandler()

router.post("/", (req, res, next) => {

  const { destination, body } = req.body

  messageHandler
    .sendMessage({ destination, body })
    .then(({ data }) => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});


module.exports = router;