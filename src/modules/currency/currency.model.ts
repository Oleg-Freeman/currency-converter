import fetch from 'node-fetch';
import { CurrencyRate } from '../../types';

export class CurrencyModel {
    async getLatest(currency: string): Promise<CurrencyRate> {
        const exchangeRateRequest = await fetch(`https://api.exchangerate.host/latest?base=${currency.toUpperCase()}`);
        const exchangeRateData = await exchangeRateRequest.json();
        return <CurrencyRate>exchangeRateData.rates.UAH;
    }
}
