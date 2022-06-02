const axios = require('axios')

module.exports = class ApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://messageapp:3000',
        })
    }

    sendMessage(messageInfo) {
        return this.axiosApp.post('/message', messageInfo)
    }
}