FROM node:14

WORKDIR /usr/src/currency-exchanger

COPY package.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run build && npm start"]
