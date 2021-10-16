FROM node:lts-alpine

WORKDIR /usr/src/app

RUN mkdir node_modules && chown -R node:node node_modules

USER node

COPY package*.json ./

RUN npm i

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]