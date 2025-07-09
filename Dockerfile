# Dockerfile.dev
FROM node:20

WORKDIR /app

COPY package*.json /app
RUN npm ci

COPY . .
COPY next.config.mjs ./next.config.mjs

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev"]
