import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || '5000',
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/my_database',
    allowedCurrencies: ['usd', 'eur'],
    baseCurrency: 'uah',
};
