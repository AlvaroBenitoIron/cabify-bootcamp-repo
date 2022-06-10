import mongoose from "mongoose";

// const server = "mongodb:27017";
const server = "localhost:27017";
const messagesDatabase = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${messagesDatabase}`, {
  useNewUrlParser: true,
});