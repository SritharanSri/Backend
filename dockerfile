FROM node:lts

RUN npm ci --cache /root/.npm

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]