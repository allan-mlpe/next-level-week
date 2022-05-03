FROM node:12.18.0-slim

ARG NODE_ENV

WORKDIR /usr/app

COPY package*.json ./

ENV NODE_ENV "$NODE_ENV"

RUN if [ "$NODE_ENV" = "development" ]; \
	then yarn install;  \
	else yarn install --production; \
	fi

COPY . .
