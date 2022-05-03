FROM node:12.18.0-slim

ARG NODE_ENV

WORKDIR /usr/app

COPY package*.json ./

ENV NODE_ENV "$NODE_ENV"

RUN npm install -g expo expo-cli

RUN \
	apt-get update \
	&& apt-get -y install procps \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* 

RUN if [ "$NODE_ENV" = "development" ]; \
	then npm install;  \
	else npm install --only=production; \
	fi

COPY . .
