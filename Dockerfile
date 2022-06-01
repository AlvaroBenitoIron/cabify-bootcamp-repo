FROM node:latest

EXPOSE 9001

# COPY ./messageapp/package*.json ./

COPY . .

RUN npm install

CMD ["node", "server.js"]