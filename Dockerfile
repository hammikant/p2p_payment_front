FROM node:lts-slim AS build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
RUN npm run build

FROM nginx:stable
RUN rm /etc/nginx/conf.d/default.conf && \
    mkdir -p /app/www
COPY --from=build /usr/src/app/dist /app/www
ENV TZ=Europe/Moscow