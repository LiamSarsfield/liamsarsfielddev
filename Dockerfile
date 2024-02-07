FROM node:16.14.0-alpine
WORKDIR /app
COPY . /app
COPY package*.json ./
RUN yarn global add @quasar/cli && yarn install
EXPOSE 80
ENV CHOKIDAR_USEPOLLING 1
CMD ["quasar", "dev"]
