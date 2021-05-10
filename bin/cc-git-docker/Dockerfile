ARG IMAGE
FROM ${IMAGE}
ARG CLONE_CMD
ENV COMPOSE_PROJECT_NAME=masters-thesis

WORKDIR /src

# install git in the container
RUN apt-get update && apt-get install -y git

RUN ${CLONE_CMD}
WORKDIR /src/code
# RUN apt install --assume-yes php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath
RUN dotnet restore
RUN dotnet build
