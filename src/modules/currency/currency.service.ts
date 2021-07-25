import { CurrencyModel } from './currency.model';
import { config } from '../../config';
import { CurrencyAttributes } from '../../types';

export class CurrencyService {
    private model: CurrencyModel;
    constructor() {
        this.model = new CurrencyModel();
    }

    async getLatest(currency: string): Promise<{ exchange: CurrencyAttributes; cached: boolean }> {
        const cache = await this.model.getCached(currency);

        if (cache) return { exchange: cache, cached: true };
        const latest = await this.model.getLatest(currency);
        const rate = await this.model.cacheCurrency({
            currency: currency.toLowerCase(),
            base: config.baseCurrency,
            rate: latest.rates.UAH,
            date: latest.date,
        });
        return { exchange: rate, cached: false };
    }
}
