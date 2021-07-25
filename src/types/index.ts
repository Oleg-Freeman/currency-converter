import { Schema } from 'mongoose';

export interface CurrencyRate {
    base: string;
    date: string;
    rates: {
        [key: string]: number;
    };
}

export interface CurrencyAttributes {
    _id: Schema.Types.ObjectId;
    base: string;
    date: string;
    rate: number;
    currency: string;
}
