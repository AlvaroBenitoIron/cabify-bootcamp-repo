import { Message, BackupMessage } from "../models/message.js";

import updateBudget from "./updateBudget.js";

import lockedSync from "locked-sync"
const sync = lockedSync()

export default async (messageParams) => {
  const message = new Message(messageParams);
  const backupMessage = new BackupMessage(messageParams)

  if (message.status === 'PENDING') {

    const end = await sync()

    try {
      
      const doc = await message.save();
      console.log("Message correctly saved:", doc);
      await updateBudget(-1)

      const backupDoc = await backupMessage.save()
      console.log("Message backup correctly saved:", backupDoc)

      return doc;

    } catch (err) {

      console.log("Error saving message", err);

    } finally {
      end()
    }
  }

}
