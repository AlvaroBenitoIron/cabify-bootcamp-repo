import { Budget } from "../model/budget.js";

export default (conditions = {}) => Budget.find(conditions);