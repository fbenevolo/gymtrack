import { Dayjs } from "https://esm.sh/dayjs@1.11.13/index.d.ts";
import { exercisesCollection } from "../connect-db.ts";

export async function updateWeightProgressionDate(exercise: string, oldDate: Dayjs, newDate: Dayjs): Promise<Response> {
    try {
        const result = await exercisesCollection.updateOne({ "exercise.name": exercise },
            { $set: { "exercise.weightProgression.$[elem].date": newDate } },
            { arrayFilters: [ { "elem.date": oldDate } ] },
        );

        if (result.modifiedCount == 0) {
            return new Response(JSON.stringify({ message: 'failed to update' }), { status: 404 });
        }

        return new Response(JSON.stringify({message: 'weight progression date updated'}), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}

export async function updateWeightProgressionWeight(exercise: string, date: Dayjs, weight: number): Promise<Response> {
    try {
        const result = await exercisesCollection.updateOne({ "exercise.name": exercise },
            { $set: { "exercise.weightProgression.$[elem].weight": weight } },
            { arrayFilters: [ { "elem.date": date } ] },
        );

        if (result.modifiedCount == 0) {
            return new Response(JSON.stringify({ message: 'failed to update' }), { status: 404 });
        }

        return new Response(JSON.stringify({message: 'weight progression weight updated'}), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}

export async function updateWeightProgressionReps(exercise: string, date: Dayjs, reps: number): Promise<Response> {
    try {
        const result = await exercisesCollection.updateOne({ "exercise.name": exercise },
            { $set: { "exercise.weightProgression.$[elem].reps": reps } },
            { arrayFilters: [ { "elem.date": date } ] },
        );

        if (result.modifiedCount == 0) {
            return new Response(JSON.stringify({ message: 'failed to update' }), { status: 404 });
        }

        return new Response(JSON.stringify({message: 'weight progression reps updated'}), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}