import mongoose from "mongoose";

import database from "../../messages/database/messages.database.js";
import backupDatabase from "../../messages/database/messages.backupDatabase.js";

const budgetSchema = new mongoose.Schema({
    amount: Number
});

const Budget = database.model("Budget", budgetSchema)
const BackupBudget = backupDatabase.model("BackupBudget", budgetSchema)
export { Budget, BackupBudget }