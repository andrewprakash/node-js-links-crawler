FROM node:9.7.1

WORKDIR /app

ADD package.json /app 

ENV PORT=80

EXPOSE 80


RUN npm install 


