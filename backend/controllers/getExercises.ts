import { Document } from "mongodb";
import { exercisesCollection } from "../connect-db.ts";

export async function getExercises(): Promise<Document> {
    try {
        const exercises = await exercisesCollection.find().toArray();
        return new Response(JSON.stringify({ message: exercises }), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}