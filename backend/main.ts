import { Application, Router } from "oak";
import { oakCors } from "oakCors";

import exercisesRouter  from "./routers/exercise.ts";
import stretchesRouter from './routers/stretch.ts';

const app = new Application();
// const router = new Router();

const PORT = 2020;
const FRONTEND_URL = 'http://localhost:4200';

app.use(oakCors({ origin: FRONTEND_URL }));

app.use(exercisesRouter.prefix('exercises/').routes());
app.use(exercisesRouter.allowedMethods());

// app.use(router.allowedMethods());


app.listen({port: PORT});

console.log(`HTTP webserver running. Access it at: http://localhost:${PORT}/`);