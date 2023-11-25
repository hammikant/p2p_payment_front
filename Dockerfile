FROM node:18.16.0-alpine AS build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm run build && ls -la build

FROM nginx:stable
RUN rm /etc/nginx/conf.d/default.conf && \
    mkdir -p /app/www && \
    mkdir -p /app/www/static
COPY --from=build /usr/src/app/build /app/www
COPY public/* /app/www/static
COPY nginx/nginx.conf /etc/nginx/nginx.conf
ENV TZ=Europe/Moscow
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]