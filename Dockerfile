FROM node:18.16.0-alpine AS build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm run build && ls -la

FROM nginx:stable
RUN rm /etc/nginx/conf.d/default.conf && \
    mkdir -p /app/www
COPY --from=build /usr/src/app/dist /app/www
COPY nginx/nginx.conf /etc/nginx/nginx.conf
ENV TZ=Europe/Moscow
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]