FROM node:18-alpine as ts-build

WORKDIR /app

COPY ./files /app
RUN yarn install
RUN yarn build

FROM node:18-alpine as ts-runtime

WORKDIR /app

COPY ./files/package.json /app
COPY ./files/yarn.lock /app
COPY --from=ts-build /app/dist /app/dist

RUN yarn install --production

EXPOSE 3001

CMD yarn start