FROM node:16

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i typescript ts-node -g

RUN npm install

COPY . .


EXPOSE 3030

CMD [ "npm", "run", "start" ]