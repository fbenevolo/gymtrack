import { Application, Router } from "oak";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.listen({port: 2020});