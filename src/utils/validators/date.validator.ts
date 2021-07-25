/* eslint-disable @typescript-eslint/no-var-requires */
import { Context, Next } from 'koa';
const Joi = require('joi').extend(require('@joi/date'));

export const checkDate = async (ctx: Context, next: Next): Promise<Next | undefined> => {
    try {
        const date = <string>ctx.params.date;

        if (!date) {
            console.log('Date not provided');
            ctx.status = 422;
            ctx.body = {
                message: `Date not provided`,
            };
            return;
        }

        const dateSchema = Joi.date().less('now').greater('2020-01-01').format('YYYY-MM-DD');
        const dateErrors = dateSchema.validate(date);

        if (dateErrors.error) {
            console.log(dateErrors.error.details);
            ctx.status = 422;
            ctx.body = {
                message: dateErrors.error.details[0].message,
            };
            return;
        }
        return next();
    } catch (err) {
        console.log('Date validation failed', err);
        ctx.status = err.statusCode || err.status || 422;
        ctx.body = {
            message: 'Date validation failed',
            err: err,
        };
    }
};
