FROM ubuntu as builder

# Install nodejs
RUN apt-get update && apt-get install -y curl

# Install yarn
RUN npm install -g yarn express

RUN mkdir /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]