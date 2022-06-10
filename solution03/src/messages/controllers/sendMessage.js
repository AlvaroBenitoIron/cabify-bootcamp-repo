import messageQueue from "../queue/message.queue.js";
import { Message, BackupMessage } from "../model/message.js";

export default async (req, res) => {

  try {
    const message = new Message({ ...req.body, status: "PENDING", })
    const backupMessage = new BackupMessage({ ...req.body, status: "PENDING" })

    message.save()
    backupMessage.save()
    await messageQueue.add({ messageId: message._id })
    res.send(message._id)
  } catch {

  }

}
