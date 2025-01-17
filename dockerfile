
RUN npm ci --cache /root/.npm

RUN --mount=type=cache,target=/root/.npm npm ci

RUN npm ci

RUN mkdir -p /root/.npm && chmod -R 777 /root/.npm && npm ci

FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]