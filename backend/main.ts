import { Application, Router } from "oak";

import { getExercises } from "./controllers/getExercises.ts";
import { addExercise } from "./controllers/addExercise.ts";
import { deleteExercise } from "./controllers/deleteExercise.ts";

import { updateExercisePr, updateExerciseWeekDay } from "./controllers/updateExercise.ts";

import { getWeightProgression } from "./controllers/getWeightProgression.ts";
import { addWeightProgression } from "./controllers/addWeightProgression.ts";
import { deleteWeightProgression } from "./controllers/deleteWeightProgression.ts";
import { updateWeightProgressionDate, updateWeightProgressionReps, updateWeightProgressionWeight } from "./controllers/updateWeightProgression.ts";

const app = new Application();
const router = new Router();

const PORT = 2020;

router.get('/', async (context) => {
    return await getExercises().then(async (response) => {
        const data = await response.json(); // Convert the ReadableStream into JSON
        context.response.status = response.status;
        context.response.body = data.message;
    });
});

router.post('/', async (context) => {
    const reqData = await context.request.body.json();

    return await addExercise(reqData).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.delete('/', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;

    return await deleteExercise(exerciseName).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.patch('/exercise/pr', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const pr = reqData.pr;

    return await updateExercisePr(exerciseName, pr).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    })
});

router.patch('/exercise/weekday', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const weekDay = reqData.weekDay;

    return await updateExerciseWeekDay(exerciseName, weekDay).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    })
});

router.get('/exercise-wp/:name', async (context) => {
    const exerciseName = context.params.name;
    
    return await getWeightProgression(exerciseName).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.post('/exercise-wp', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const weightProgression = reqData.weightProgression;
    
    return await addWeightProgression(exerciseName, weightProgression).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.patch('/exercise-wp/date', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const oldDate = reqData.oldDate;
    const newDate = reqData.newDate;

    return await updateWeightProgressionDate(exerciseName, oldDate, newDate).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.patch('/exercise-wp/weight', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const date = reqData.date;
    const weight = reqData.weight;

    return await updateWeightProgressionWeight(exerciseName, date, weight).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.patch('/exercise-wp/reps', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const date = reqData.date;
    const reps = reqData.reps;

    return await updateWeightProgressionReps(exerciseName, date, reps).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });
});

router.delete('/exercise-wp', async (context) => {
    const reqData = await context.request.body.json();
    const exerciseName = reqData.name;
    const date = reqData.date;

    return await deleteWeightProgression(exerciseName, date).then(async (response) => {
        const data = await response.json();
        context.response.status = data.status;
        context.response.body = data.message;
    });

});

app.use(router.routes());
app.listen({port: PORT});

console.log(`HTTP webserver running. Access it at: http://localhost:${PORT}/`);