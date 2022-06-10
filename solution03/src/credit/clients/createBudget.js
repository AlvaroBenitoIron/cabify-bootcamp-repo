import { Budget, BackupBudget } from '../model/budget.js'

import lockedSync from "locked-sync"
const sync = lockedSync()

export default async (budgetParams) => {

    const checkIfBudget = await Budget.find()

    if (checkIfBudget.length != 0) {

        console.log("Budget already created")

    } else {

        const budget = new Budget(budgetParams);
        const backupBudget = new BackupBudget(budgetParams)

        const end = await sync()

        try {
            const doc = await budget.save();
            const backupDoc = await backupBudget.save();

            console.log("Budget correctly saved:", doc);
            return doc;

        } catch (err) {

            console.log("Error saving budget", err);

        } finally {
            end()
        }

    }
}