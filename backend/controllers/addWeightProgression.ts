import { exercisesCollection } from "../connect-db.ts";
import { WeightProgression } from "../models/exercise.ts";


export async function addWeightProgression(exercise: string, wp: WeightProgression): Promise<Response> {
    try {
        const result = await exercisesCollection.updateOne({ "exercise.name": exercise }, 
            { $push: {"exercise.weightProgression": JSON.parse(JSON.stringify(wp))} }
        )

        if (result.matchedCount == 0) {
            return new Response(JSON.stringify({ message: 'failed to insert new progression' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'weight progression inserted' }), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 });
    }
}