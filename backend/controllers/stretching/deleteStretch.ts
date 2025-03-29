import { stretchingCollection } from "../../connect-db.ts";

export default async function deleteStretch(stretch: string): Promise<Response> {
    try {
        const result = await stretchingCollection.deleteOne({ "name": stretch });
        if (result.deletedCount == 1) {
            return new Response(JSON.stringify({ message: 'stretch deleted successfully' }), { status: 201 });
        }
        return new Response(JSON.stringify({ message: 'failed to delete stretch' }), { status: 500 });        

    }
    catch(error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}