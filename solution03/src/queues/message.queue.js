import Queue from 'bull'
import http from "http";

import { Message } from "../models/message.js";
import updateBudget from "../clients/updateBudget.js";
import getCredit from "../clients/getCredit.js";

const redisHost = "localhost";
const redisPort = 6379

const messageQueue = new Queue('message', {
    redis: { host: redisHost, port: redisPort }
})

messageQueue.process(async (job) => {

    const budget = await getCredit()

    if (budget[0].amount < 0) {
        await Message.findByIdAndUpdate(job.data.messageId, { status: "NOT ENOUGH CREDIT" })

        return

    } else {

        const message = await Message.findById(job.data.messageId)
        const body = JSON.stringify({ body: message.body, destination: message.destination });
        const postOptions = {
            host: "localhost",
            // host: "messageapp",
            port: 3000,
            path: "/message",
            method: "post",
            json: true,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body),
            },
        };

        const postReq = http.request(postOptions);

        postReq.on("response", async (postRes) => {
            try {
                const status = postRes.statusCode === 200 ? "OK" : "ERROR"
                await Message.findByIdAndUpdate(job.data.messageId, { status: status })

            } catch (error) {
                console.log(error.message);
            }
        });

        postReq.on("timeout", async () => {
            console.error("Timeout Exceeded!");
            postReq.abort();

            try {
                await Message.findByIdAndUpdate(job.data.messageId, { status: "TIMEOUT" })

            } catch {
            }
        });

        postReq.write(body);
        postReq.end();

    }

});



export default messageQueue