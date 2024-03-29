FROM node:20.9-slim as build

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli

RUN npm install

RUN ng build

FROM nginx:stable-alpine

COPY --from=build /app/dist/my-links-web/browser /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80
