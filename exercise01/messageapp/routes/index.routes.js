const router = require("express").Router();
const messagesService = require("../services/message.service")

router.post("/messages", (req, res, next) => {

  const { destination, body } = req.body

  messagesService
    .sendMessage({ destination, body })
    .then((message) => res.status(200).json(message.data))
    .catch((err) => res.status(500).json({ message: "service failed", err }))

})

module.exports = router;