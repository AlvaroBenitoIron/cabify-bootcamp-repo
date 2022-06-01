FROM node:latest

EXPOSE 9001

COPY ./messageapp ./

RUN npm install

# ARG BUILD_TAG=unknown
# LABEL BUILD_TAG=$BUILD_TAG

CMD ['npm', 'start']