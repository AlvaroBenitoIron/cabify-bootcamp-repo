
import saveMessage from "../clients/saveMessage.js";
import messageQueue from "../queues/message.queue.js";
import { Message } from "../models/message.js";

export default async (req, res) => {

  try {
    const message = new Message({ ...req.body, status: "PENDING", })
    message.save()
    await messageQueue.add({ messageId: message._id })
    res.send(message._id)
  } catch {

  }

}
