FROM node:16-alpine as prod
WORKDIR /client

COPY ["./package.json", "./yarn.lock", "./postcss.config.cjs", "./tailwind.config.cjs", "./tsconfig.json", "./tsconfig.node.json", "./vite.config.ts" ,"./"]

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:1.17-alpine

COPY ./nginx.conf etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=prod /client/dist .

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]