import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { config } from './config';
import mongoose from 'mongoose';

const app = new Koa();

// Middlewares
app.use(cors());
app.use(bodyParser());
app.use(json());

// Routes
// app.use(routes());

// Error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = { code: err.statusCode, message: err.message };
        ctx.app.emit('error', err, ctx);
    }
});

mongoose
    .connect(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Database connected');
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch((err) => console.log(err));
