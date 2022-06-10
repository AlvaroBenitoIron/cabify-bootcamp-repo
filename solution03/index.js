import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";

import getMessages from "./src/messages/controllers/getMessages.js";
import sendMessage from "./src/messages/controllers/sendMessage.js";
import getCredit from "./src/credit/controllers/getCredit.js";
import setBudget from "./src/credit/controllers/setBudget.js";
import getMessageStatus from "./src/messages/controllers/getMessageStatus.js";

import { Budget } from "./src/credit/model/budget.js"

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    }
  },
};

const budgetSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    amount: {
      type: "number"
    }
  }
}

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  sendMessage
);

app.get("/messages", getMessages);

app.get("/message/:messageId/status", getMessageStatus)

app.post(
  "/credit",
  bodyParser.json(),
  validate({ body: budgetSchema }),
  setBudget
);

app.get("/credit", getCredit)

app.delete("/credit", (req, res) => {
  Budget
    .deleteMany()
    .then(_response => res.status(200).json({ message: "Deleted budget" }))
    .catch(_err => res.status(500).json({ message: "Cannot delete budget" }))
})

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});