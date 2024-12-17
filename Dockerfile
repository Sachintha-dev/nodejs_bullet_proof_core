FROM node:14-alpine

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i -g ts-node typescript

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN apk add --update --no-cache openssl1.1-compat

RUN npm i

COPY . .

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start" ]
