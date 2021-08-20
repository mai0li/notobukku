FROM node:16-alpine

RUN mkdir -p /home/node/notobukku/node_modules && chown -R node:node /home/node/notobukku

WORKDIR /home/node/notobukku

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]