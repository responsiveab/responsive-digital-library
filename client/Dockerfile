FROM node:14.15.3-alpine3.12

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /usr/app

COPY . .

RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]