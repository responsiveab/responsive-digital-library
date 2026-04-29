FROM node:18-alpine AS client-build

WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN cp .env.prod .env && npm run build

FROM node:18-alpine AS server-build

WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN cp src/index.prod.js src/index.js && npm run build

FROM node:18-alpine

WORKDIR /usr/src/app/
COPY --from=client-build /app/build/ ./client/build/

WORKDIR /usr/src/app/server/
COPY --from=server-build /app/package*.json ./
COPY --from=server-build /app/node_modules/ ./node_modules/
COPY --from=server-build /app/dist/ ./dist/
COPY --from=server-build /app/.env ./.env

EXPOSE 8080

CMD [ "node", "dist/main.cjs" ]
