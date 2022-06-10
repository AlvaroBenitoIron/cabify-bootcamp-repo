import mongoose from "mongoose";

// const server = "mongodb:27019";
const server = "localhost:27019";
const creditDatabase = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${creditDatabase}`, {
    useNewUrlParser: true,
});