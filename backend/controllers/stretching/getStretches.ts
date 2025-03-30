import { stretchingCollection } from "../../connect-db.ts";
import { Stretch } from "../../models/stretch.ts";

export default async function getStretches(): Promise<Response> {
    try {
        const result = await stretchingCollection.find().toArray();
        
        let stretchesGrouped: Array<{ [k: number]: any }> = [];

        const routineNumbers = new Set(result.map((s: any) => { return s.routineNumber }));
        routineNumbers.forEach((n: number) => {
            const stretches = result.filter((r: any) => { return r.routineNumber == n });
            stretchesGrouped.push({ [n]: stretches });
        });
        
        return new Response(JSON.stringify({ message: stretchesGrouped }), { status: 201 });

    }
    catch(error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}