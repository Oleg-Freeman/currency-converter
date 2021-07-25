import { CurrencyModel } from './currency.model';
import { config } from '../../config';
import { CurrencyAttributes } from '../../types';

export class CurrencyService {
    private model: CurrencyModel;
    constructor() {
        this.model = new CurrencyModel();
    }

    async getExchangeRate(currency: string, date: string): Promise<{ exchange: CurrencyAttributes; cached: boolean }> {
        const cache = await this.model.getCached(currency, date);

        if (cache) return { exchange: cache, cached: true };
        const latest = await this.model.queryExchangeRate(currency, date);
        const rate = await this.model.cacheExchangeRate({
            currency: currency.toLowerCase(),
            base: config.baseCurrency,
            rate: latest.rates[config.baseCurrency.toUpperCase()],
            date: latest.date,
        });
        return { exchange: rate, cached: false };
    }
}
