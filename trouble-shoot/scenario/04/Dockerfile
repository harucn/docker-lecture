FROM node:26

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/index.js"]
