FROM node:14.15.3-alpine3.12

ARG NODE_ENV=development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080
EXPOSE 9292

#CMD ["npm","start"]
CMD [ "node", "dist/main.js" ]