FROM node:lts
WORKDIR /src
ADD package.json /src
ADD package-lock.json /src

# install npm dependencies
RUN npm i --silent
ADD . /src

# set environment variable overrides of .env file
ENV API_PORT=8000
ENV DEV_PORT=8001
ENV DOCKER_ENV=true
ENV LOGS_PATH=logs

# Configure docker and docker-compose in the master container so it can spawn computation containers later on
ENV DOCKERVERSION=20.10.6
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz
RUN curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
