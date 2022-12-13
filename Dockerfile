# stage 1

FROM node:alpine AS front-app
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=front-app /app/dist/ /usr/share/nginx/html
EXPOSE 80