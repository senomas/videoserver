FROM node:12
LABEL maintainer="Senomas <agus@hanoman.co.id>"

WORKDIR /home/node/app

ADD package.json /home/node/app/
ADD yarn.lock /home/node/app/

RUN yarn install --frozen-lockfile

COPY . /home/node/app/
WORKDIR /home/node/app/

RUN yarn build

EXPOSE 3000

CMD [ "node", "-r", "source-map-support/register", "server/index.js" ]
