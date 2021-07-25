import { Context, Next } from 'koa';

const currencies = ['usd', 'eur'];

export const allowedCurrencies = async (ctx: Context, next: Next): Promise<Next | undefined> => {
    try {
        const currency = <string>ctx.params.currency;

        if (!currency) {
            console.log('Currency not provided');
            ctx.status = 422;
            ctx.body = {
                message: `Currency not provided`,
            };
            return;
        }

        const isAllowed = currencies.find((c) => c === currency);

        if (!isAllowed) {
            console.log('Currency not allowed');
            ctx.status = 422;
            ctx.body = {
                message: `Currency not allowed`,
            };
            return;
        }
        return next();
    } catch (err) {
        console.log('Currency validation failed', err);
        ctx.status = err.statusCode || err.status || 422;
        ctx.body = {
            message: 'Currency validation failed',
            err: err,
        };
    }
};
