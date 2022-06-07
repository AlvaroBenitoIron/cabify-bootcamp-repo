import { Budget, BackupBudget } from '../models/budget.js'

export default async (change) => {

    const budget = await Budget.find()
    const budgetBackup = await BackupBudget.find()

    try {

        budget[0].amount += change

        const doc = await budget[0].save()
        console.log("Budget correctly updated:", doc);

        // try catch para guardar en la replica

        try {
            budgetBackup[0].amount += change

            const doc = await budgetBackup[0].save()
            console.log("Budget Backup correctly updated:", doc);
        } catch {
            budget[0].amount -= change
            
            const doc = await budget[0].save()
            console.log("Budget rollback", doc)
        }

        return doc;

    } catch (err) {
        console.log("Error updating the budget", err);
    }

}