FROM node:lts
WORKDIR /src
ADD package.json /src
ADD package-lock.json /src

# install npm dependencies
RUN npm i --silent
ADD . /src

# install git in the container
RUN apt-get install -y git

# set environment variable overrides of .env file
ENV API_PORT=8000
ENV DEV_PORT=8001
ENV DOCKER_ENV=true
ENV LOGS_PATH=logs
