import { exercisesCollection } from "../../connect-db.ts";

export async function getWeightProgression(exercise: string): Promise<Response> {
    try {
        const result = await exercisesCollection.findOne({ "exercise.name": exercise },
            { projection: { "exercise.weightProgression": 1 }}
        );

        return new Response(JSON.stringify({ message: result }), { status: 201 })

    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });

    }
}