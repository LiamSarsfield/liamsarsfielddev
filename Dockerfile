FROM node:15.9.0-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN yarn
RUN yarn global add @quasar/cli
COPY . .
CMD ["quasar", "dev"]
