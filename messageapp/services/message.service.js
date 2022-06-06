const axios = require('axios')
const Message = require("../models/Message.model")

module.exports = class MessageService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://localhost:9001',

        })
    }

    dbMessage(messageInfo) {

        return Message
            .create(messageInfo)
            .then(res => res.data)
            .catch(err => err.data)

    }


}