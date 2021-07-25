import Router from 'koa-router';
import { CurrencyService } from './currency.service';
import { allowedCurrencies } from '../../utils/validators/allowedCurrencies.validator';

const router = new Router();

// convert by date
router.get('/currency/history/:currency/:date', async (ctx) => {
    try {
        // TODO
    } catch (err) {
        console.log('Get currency history failed', err);
        ctx.status = err.statusCode || err.status || 400;
        ctx.body = {
            message: 'Get currency history failed',
            err: err,
        };
    }
});

// convert latest
router.get('/currency/latest/:currency', allowedCurrencies, async (ctx) => {
    try {
        const currency = ctx.params.currency;
        const service = new CurrencyService();
        const latest = await service.getLatest(currency);
        ctx.status = 200;
        ctx.body = {
            rate: `${currency.toUpperCase()}/UAH: ${latest.exchange.rate}`,
            cached: latest.cached,
        };
    } catch (err) {
        console.log('Get latest currency failed', err);
        ctx.status = err.statusCode || err.status || 400;
        ctx.body = {
            message: 'Get latest currency failed',
            err: err,
        };
    }
});

export = router;
