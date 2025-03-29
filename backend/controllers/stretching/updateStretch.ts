import { stretchingCollection } from "../../connect-db.ts";

export async function updateStretchName(oldName: string, newName: string): Promise<Response> {
    try {
        const result = await stretchingCollection.updateOne({ "name": oldName }, 
            {
                $set: { "name": newName } 
            });

        if (result.modifiedCount == 1) {
            return new Response(JSON.stringify({ message: 'stretch name updated successfully' }), { status: 201 });
        }
        return new Response(JSON.stringify({ message: 'failed to update stretch name' }), { status: 500 });        

    }
    catch(error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}

export async function updateStretchValue(name: string, value: number): Promise<Response> {
    try {
        const result = await stretchingCollection.updateOne({ "name": name }, 
            {
                $set: { "value": value } 
            });

        if (result.modifiedCount == 1) {
            return new Response(JSON.stringify({ message: 'stretch value updated successfully' }), { status: 201 });
        }
        return new Response(JSON.stringify({ message: 'failed to update stretch value' }), { status: 500 });        

    }
    catch(error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}