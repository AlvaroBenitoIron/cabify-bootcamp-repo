import { Message } from "../models/message.js";

export default async (conditions) => {

    const message = await Message.findById(conditions.messageId)


    return message.status
};