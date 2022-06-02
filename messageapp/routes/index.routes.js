const router = require("express").Router();
const ApiHandler = require('./../services/APIHandler')

const messageHandler = new ApiHandler()

router.post("/messages", (req, res, next) => {

  const { destination, message } = req.body

  if (!destination && !message) {
    res.status(400).json({ message: "You should not pass empty object" })
  }
  else if (!destination) {
    res.status(400).json({ message: "Destination is required" })
  }
  else if (!message) {
    res.status(400).json({ message: "Message is required" })
  }
  else if (typeof destination !== String || typeof message !== String) {
    res.status(400).json({ message: "Only strings allowed" })
  }
  else {
    messageHandler
      .sendMessage({ destination, body: message })
      .then(({ data }) => res.status(200).json(data))
      .catch(err => res.status(500).json({ message: 'Internal Server Error' }))
  }

});


module.exports = router; 