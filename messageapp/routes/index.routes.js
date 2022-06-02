const router = require("express").Router();
const ApiHandler = require('./../services/APIHandler')
const messageHandler = new ApiHandler()

const MessageService = require('../services/message.service')
const messageDBService = new MessageService()

const Message = require('../models/Message.model')

router.get('/messages', (req, res) => {
  Message
    .find()
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

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
  else if (typeof destination !== "string" || typeof message !== "string") {
    res.status(400).json({ message: "Only strings allowed" })
  }
  else {
    messageHandler

      .sendMessage({ destination, body: message })
      .then(() => {
        messageDBService
          .dbMessage({ destination, message })
          .then(_response => res.status(200).json({ message: "Message stored" }))
          .catch(_err => res.status(500).json({ message: "Message not stored" }))
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Errooooooooooooooooooor' }))
  }
});


module.exports = router; 