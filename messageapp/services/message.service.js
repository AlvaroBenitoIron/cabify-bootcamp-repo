const axios = require("axios")

class MessagesService {

    constructor() {
        this.api = axios.create({ baseURL: "http://messageapp:3000" })
    }

    sendMessage = (message) => {

        let finalMessage = {
            "destination": message.destination,
            "body": message.body
        }

        return this.api.post("/message", finalMessage)
    }

}

const messagesService = new MessagesService()
module.exports = messagesService