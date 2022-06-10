import mongoose from "mongoose";

const server = "127.0.0.1:27020";
// const server = "mongodbBackup:27020"
const creditBackupDatabase = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${creditBackupDatabase}`, {
    useNewUrlParser: true,
});