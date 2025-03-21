import { exercisesCollection } from "../connect-db.ts";
import Exercise from "../models/exercise.ts";

export async function addExercise(exercise: Exercise): Promise<Response> {
    try { 

        exercise.weightProgression = [];

        const result = await exercisesCollection.insertOne({ exercise });

        if (!result.acknowledged) {
            return new Response(JSON.stringify({message: 'insertion failed'}), 
            { 
                status: 500 ,
                headers: { "Content-Type": "application/json" }
            });    
        }

        return new Response(JSON.stringify({message: 'exercise inserted successfully' }), 
        { 
            status: 201,
            headers: { "Content-Type": "application/json" }
         });

    }
    catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}