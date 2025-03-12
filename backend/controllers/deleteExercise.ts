import { exercisesCollection } from "../connect-db.ts";

export async function deleteExercise(exercise: string): Promise<Response>{
    try { 
        const result = await exercisesCollection.deleteOne({ "exercise.name": exercise });
        if (result.deletedCount == 0) {
            return new Response(JSON.stringify({ message: 'resource not found' }), { status: 404, });
        }

        return new Response(JSON.stringify({ message: 'exercise removed successfully' }), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}