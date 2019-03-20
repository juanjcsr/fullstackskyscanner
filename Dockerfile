FROM node:8.15.1-alpine as buildproduction

WORKDIR /client
COPY client /client/
RUN npm install
RUN npm run build


FROM node:8.15.1-alpine
COPY server /www/server
COPY --from=buildproduction /client/build /www/client/build
WORKDIR /www/server
RUN npm install
RUN npm install -g pm2
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080
CMD ["pm2-docker", "src/server.js"]