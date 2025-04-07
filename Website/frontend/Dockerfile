FROM node:alpine
WORKDIR /invsee

COPY invsee/package*.json ./

RUN npm install

COPY invsee ./

EXPOSE 3000

CMD ["npm", "run", "dev"]