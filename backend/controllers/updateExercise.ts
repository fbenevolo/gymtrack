import { exercisesCollection } from "../connect-db.ts";

export async function updateExercisePr(exercise: string, pr: number): Promise<Response> {
    try {
        const result = await exercisesCollection.updateOne({ "exercise.name": exercise }, 
            { $set: {"exercise.pr": pr }}
        )

        if (result.modifiedCount == 0) {
            return new Response(JSON.stringify({ message: 'failed to update' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'exercise updated' }), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 });
    }
}


export async function updateExerciseWeekDay(exercise: string, weekDay: string): Promise<any> {
    try {

        const result = await exercisesCollection.updateOne({"exercise.name": exercise}, 
            {$set: {"exercise.weekDay": weekDay}}
        )

        if (result.modifiedCount == 0) {
            return new Response(JSON.stringify({ message: 'failed to update' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'exercise updated' }), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 });
    }
}