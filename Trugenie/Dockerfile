FROM node:16-slim
WORKDIR /root/
RUN npm i express body-parser morgan
COPY ./dist ./dist
COPY server.js ./

CMD ["node", "server.js"]