import { stretchingCollection } from "../../connect-db.ts";
import { Stretch } from '../../models/stretch.ts';

export default async function addStretch(stretch: Stretch): Promise<Response> {
    try {
        const result = await stretchingCollection.insertOne(stretch);
        if (result.insertedId) {
            return new Response(JSON.stringify({ message: 'stretch inserted successfully' }), { status: 201 });
        }
        return new Response(JSON.stringify({ message: 'failed to insert stretch' }), { status: 500 });        

    }
    catch(error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}