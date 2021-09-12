FROM node:slim

WORKDIR /src

COPY ./app /src

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "app.js"]