FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/practice_blog
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/practice_server
RUN npm i

EXPOSE 3005

CMD ["node", "app.js"]