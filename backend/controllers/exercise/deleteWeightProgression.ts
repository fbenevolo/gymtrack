import { Dayjs } from "https://esm.sh/dayjs@1.11.13/index.d.ts";
import { exercisesCollection } from "../../connect-db.ts";

export async function deleteWeightProgression(exercise: string, date: Dayjs): Promise<Response> {
    try {
        const result = await exercisesCollection.updateOne({ "exercise.name": exercise },
            { $pull: { "exercise.weightProgression.date": { "date": date } } });

        if (result.modifiedCount == 0) {
            return new Response(JSON.stringify({ message: 'resource not found' }), { status: 404, });
        }

        return new Response(JSON.stringify({ message: 'weight progression removed successfully' }), { status: 201 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}