FROM node:13.8.0

RUN mkdir -p /srv/app/mewtter-server
WORKDIR /srv/app/mewtter-server

COPY package.json /srv/app/mewtter-server
COPY package-lock.json /srv/app/mewtter-server

RUN npm cache verify
RUN npm install

COPY . /srv/app/mewtter-server

EXPOSE 8000

CMD ["npm", "start"]
