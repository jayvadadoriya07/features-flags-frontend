FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY demo_feature_flag/package*.json ./

RUN npm install

# Copy just the application files
COPY demo_feature_flag/ ./

EXPOSE 9000

CMD [ "npm","run","dev","--","--host","0.0.0.0","--port","9000" ]