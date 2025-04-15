# ------------------------
# Step 1: Build react app
# ------------------------

# Use node:latest as the builder image
FROM node:latest AS builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
RUN npm run build
FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

EXPOSE 3000
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]