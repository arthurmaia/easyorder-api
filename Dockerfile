FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "dist/main"]