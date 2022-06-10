import mongoose from "mongoose";

import database from "../database/messages.database.js";
import backupDatabase from "../database/messages.backupDatabase.js";

const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT", "PENDING", "NOT ENOUGH CREDIT"],
  }
});

const Message = database.model("Message", messageSchema)
const BackupMessage = backupDatabase.model("BackupMessage", messageSchema)
export { Message, BackupMessage }
