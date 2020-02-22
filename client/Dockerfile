FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/mewtter-client
WORKDIR /srv/app/mewtter-client

COPY package.json /srv/app/mewtter-client
COPY package-lock.json /srv/app/mewtter-client

RUN npm cache verify
RUN npm install

COPY . /srv/app/mewtter-client

EXPOSE 3000

CMD ["npm", "start"]