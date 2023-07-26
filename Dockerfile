FROM node:18-alpine3.17

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

COPY . .

RUN yarn --prod --frozen-lockfile
RUN apk add --no-cache openssl dumb-init
EXPOSE 8081 
CMD ["dumb-init", "yarn", "start"]