## Setup
FROM node:16-alpine as setup

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

## Development
FROM setup as development
WORKDIR /usr/src/app

RUN yarn build

## Production
FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

# Config do Thiago
# FROM node:16-alpine

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY yarn.lock ./

# RUN yarn install
# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["node", "dist/main"]