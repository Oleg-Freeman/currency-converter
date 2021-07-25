import { Schema, model } from 'mongoose';
import { config } from '../../config';
import { CurrencyAttributes } from '../../types';

const CurrencySchema = new Schema<CurrencyAttributes>({
    currency: {
        type: String,
        required: true,
        enum: config.allowedCurrencies,
    },
    base: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export const Currency = model<CurrencyAttributes>('Currency', CurrencySchema);
