FROM node:12.15.0

RUN mkdir -p /usr/src/segnalazioni

COPY dist/Segnalazioni /usr/src/segnalazioni/dist/Segnalazioni
COPY ssl /usr/src/segnalazioni/ssl

COPY authMiddleware.js /usr/src/segnalazioni/
COPY serverdata.json /usr/src/segnalazioni/
COPY server.js /usr/src/segnalazioni/server.js
COPY deploy-package.json /usr/src/segnalazioni/package.json

WORKDIR /usr/src/segnalazioni

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]