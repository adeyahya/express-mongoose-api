FROM node:wheezy

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

COPY package.json /app

COPY . /app
RUN npm install

EXPOSE 8000
CMD ["npm", "start"]
