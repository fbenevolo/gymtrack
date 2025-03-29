import { exercisesCollection } from "../../connect-db.ts";
import { Exercise } from "../../models/exercise.ts";

import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/pt';

dayjs.extend(localeData);
dayjs.locale('pt');

export async function groupExercises(): Promise<Response> {
    try {
        const result = await exercisesCollection.find().toArray();
        // let weekOrganization: {[key: string]: Array<any>} = {};

        let weekOrganization: Array<{[key: string]: Array<any>}> = [];

        for (const day of dayjs.weekdays()) {
            const query = result.filter((r: any) => r.exercise.weekDay == day );
            weekOrganization.push({[day]: query});
        }

        return new Response(JSON.stringify({ message: weekOrganization }), { status: 201 });

    }
    catch (error) {
        return new Response(JSON.stringify({ message: error}), { status: 500 });
    }
}