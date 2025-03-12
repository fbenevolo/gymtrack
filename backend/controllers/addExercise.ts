import { exercisesCollection } from "../connect-db.ts";
import Exercise from "../models/exercise.ts";

export async function addExercise(exercise: Exercise): Promise<Response> {
    try { 
        const result = await exercisesCollection.insertOne({ exercise, weightProgression: [] });

        if (!result.acknowledged) {
            return new Response(JSON.stringify({message: 'insertion failed'}), { status: 500 });    
        }

        return new Response(JSON.stringify({message: 'exercise inserted successfully' }), { status: 201 });

    }
    catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}