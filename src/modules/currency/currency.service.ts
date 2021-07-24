import { CurrencyModel } from './currency.model';
import { CurrencyRate } from '../../types';
export class CurrencyService {
    private model: CurrencyModel;
    constructor() {
        this.model = new CurrencyModel();
    }

    async getLatest(currency: string): Promise<CurrencyRate> {
        return await this.model.getLatest(currency);
    }
}
