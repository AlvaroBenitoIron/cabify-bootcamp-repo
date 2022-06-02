const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, "Destination is required"],
            trim: true
        },

        message: {
            type: String,
            required: [true, "Message is required"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Message', messageSchema)