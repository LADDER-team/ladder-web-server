FROM node:10.5.0 as builder
WORKDIR /root/ladder
COPY [".", ":root/ladder"]
EXPOSE 80
RUN npm install && \
    npm run build

FROM nginx
COPY ["docker/nginx.conf", "/etc/nginx/nginx.conf"]
COPY --from=builder /root/ladder/dist /usr/share/nginx/html
