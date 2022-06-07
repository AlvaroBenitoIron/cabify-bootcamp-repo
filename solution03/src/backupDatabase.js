import mongoose from "mongoose";

const server = "127.0.0.1:27018";
// const server = "mongodbBackup:27018"
const backupDatabase = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${backupDatabase}`, {
    useNewUrlParser: true,
});
