import { Router } from "oak";

import getStretches from "../controllers/stretching/getStretches.ts";
import addStretch from "../controllers/stretching/addStretch.ts";
import deleteStretch from "../controllers/stretching/deleteStretch.ts";

import { updateStretchName, updateStretchValue } from "../controllers/stretching/updateStretch.ts";


const router = new Router();

router.get('/', async (context) => {
    return await getStretches().then(async (response) => {
        const data = await response.json();
        context.response.body = data.message;
        context.response.status = response.status;
    })
});

router.post('/', async (context) => {
    const reqData = await context.request.body.json();

    return await addStretch(reqData).then(async (response) => {
        const data = await response.json();
        context.response.body = data.message;
        context.response.status = response.status;
    });

});

router.delete('/', async (context) => {
    const reqData = await context.request.body.json();
    const name = reqData.name;

    return await deleteStretch(name).then(async (response) => {
        const data = await response.json();
        context.response.body = data.message;
        context.response.status = response.status;
    });

});

router.patch('/name', async (context) => {
    const reqData = await context.request.body.json();
    const oldName = reqData.name;
    const newName = reqData.newName;

    return await updateStretchName(oldName, newName).then(async (response) => {
        const data = await response.json();
        context.response.body = data.message;
        context.response.status = response.status;
    });

});

router.patch('/value', async (context) => {
    const reqData = await context.request.body.json();
    const name = reqData.name;
    const value = reqData.value;

    return await updateStretchValue(name, value).then(async (response) => {
        const data = await response.json();
        context.response.body = data.message;
        context.response.status = response.status;
    });

});

export default router;