# STAGE 1

FROM node:16.17 as build
WORKDIR /dist/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2

FROM nginx:alpine
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /dist/src/app/frontend /usr/share/nginx/html
EXPOSE 80