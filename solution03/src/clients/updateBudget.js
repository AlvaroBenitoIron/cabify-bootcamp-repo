import Budget from '../models/budget.js'

export default async (change) => {

    const budget = await Budget.find()

    if (budget[0].amount > change) {

        try {

            budget[0].amount -= change

            const doc = await budget[0].save()
            console.log("Budget correctly updated:", doc);
            return doc;

        } catch (err) {
            console.log("Error while updating", err);
        }

    } else {

        console.log("Not enough credit")

    }
}