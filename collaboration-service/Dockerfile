# syntax=docker/dockerfile:1
FROM node:16.4.2
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "index.js"]
EXPOSE 8400
