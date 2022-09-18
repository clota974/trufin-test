import Router from "@koa/router";
import Koa from 'koa';
import koaBody from "koa-body";
import HashFinder from "./hash-finder";
import cors from '@koa/cors';

const app = new Koa();
const router = new Router();

router.post('/api', async (ctx) => {
    if (!ctx.request.body.hashInput.match(/^[a-zA-Z0-9]{64}$/)) {
        ctx.status = 400;
        ctx.body = JSON.stringify({
            type: 'error',
            message: 'Invalid request body: hash input invalid'
        });
        return;
    }

    const hashFinder = new HashFinder(ctx.request.body.hashInput);
    ctx.body = await hashFinder.toResponse();
});

app.use(cors());
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server started on port 3000');
})