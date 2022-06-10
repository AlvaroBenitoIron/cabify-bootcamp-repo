import { Message } from "../model/message.js";

export default (conditions = {}) => Message.find(conditions);
