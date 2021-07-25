import Router from 'koa-router';
import { CurrencyService } from './currency.service';
import { allowedCurrencies } from '../../utils/validators/allowedCurrencies.validator';
import { checkDate } from '../../utils/validators/date.validator';

const router = new Router();

// convert by date
router.get('/currency/history/:currency/:date', allowedCurrencies, checkDate, async (ctx) => {
    try {
        const { currency, date } = ctx.params;
        const amount = <string | undefined>ctx.query.amount;
        const service = new CurrencyService();
        const history = await service.getExchangeRate(currency, date);
        ctx.status = 200;
        ctx.body = {
            currencies: `${currency.toUpperCase()}/${history.exchange.base.toUpperCase()}`,
            rate: history.exchange.rate,
            ...(amount ? { amount: history.exchange.rate * Number(amount) } : {}),
            cached: history.cached,
        };
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
        const amount = <string | undefined>ctx.query.amount;
        const service = new CurrencyService();
        const latest = await service.getExchangeRate(currency, 'latest');
        ctx.status = 200;
        ctx.body = {
            currencies: `${currency.toUpperCase()}/${latest.exchange.base.toUpperCase()}`,
            rate: latest.exchange.rate,
            ...(amount ? { amount: latest.exchange.rate * Number(amount) } : {}),
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
