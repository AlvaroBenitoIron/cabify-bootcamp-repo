import { Budget, BackupBudget } from '../model/budget.js'

export default async (change) => {

    const budget = await Budget.find()
    const budgetBackup = await BackupBudget.find()
    // let flag = false

    try {
        budget[0].amount += change

        const doc = await budget[0].save()
        console.log("Budget correctly updated:", doc);

        // flag = true

        // try catch para guardar en la replica, se podría hacer todo en el mismo try catch
        // y usar por ejemplo una variable flag para ver cual de las dos es la que falla.

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