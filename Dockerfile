#build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --global yarn

RUN yarn install

COPY . .

RUN yarn build

#prod stage 
FROM node:18-alpine AS build

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install --production=true

EXPOSE 3000

RUN rm package*.json

RUN rm yarn.lock

CMD [ "node", "dist/main.js" ]



