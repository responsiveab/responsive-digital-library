FROM node:14.15.3-alpine3.12 as client

WORKDIR /usr/app/client/

COPY client/package*.json ./

RUN npm install

COPY client/ ./
RUN ls

RUN npm run build

FROM node:14.15.3-alpine3.12

WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/
RUN ls

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8080

EXPOSE 8080

#CMD ["npm", "start"]ä
CMD [ "node", "dist/main.js" ]
