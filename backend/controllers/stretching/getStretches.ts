import { stretchingCollection } from "../../connect-db.ts";

export default async function getStretches(): Promise<Response> {
    try {
        const result = await stretchingCollection.find().toArray();
        return new Response(JSON.stringify({ message: result }), { status: 201 });

    }
    catch(error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}