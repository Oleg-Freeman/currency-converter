import fetch from 'node-fetch';
import { CurrencyAttributes, CurrencyRate } from '../../types';
import { Currency } from './currency.entity';
import { Model } from 'mongoose';

export class CurrencyModel {
    private model: Model<CurrencyAttributes>;
    constructor() {
        this.model = Currency;
    }

    async getLatest(currency: string): Promise<CurrencyRate> {
        const exchangeRateRequest = await fetch(`https://api.exchangerate.host/latest?base=${currency.toUpperCase()}`);
        return await exchangeRateRequest.json();
    }

    async getCached(currency: string): Promise<CurrencyAttributes | null> {
        return this.model.findOne({ currency });
    }

    async cacheCurrency(data: { date: string; rate: number; currency: string; base: string }): Promise<CurrencyAttributes> {
        const rate = await new Currency(data);
        rate.save();
        return rate;
    }
}
