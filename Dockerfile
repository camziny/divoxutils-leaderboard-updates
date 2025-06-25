FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

RUN npm install pm2 -g

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"] 