import Queue from 'bull'

const redisHost = "localhost";
const redisPort = 6379

const creditQueue = new Queue('credit', {
    redis: { host: redisHost, port: redisPort }
})
const messageQueue = new Queue('message', {
    redis: { host: redisHost, port: redisPort }
})