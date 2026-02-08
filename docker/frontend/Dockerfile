# 1. Install required dependency : nodejs
FROM node:16 AS build-stage

# 2. Create the working directory
WORKDIR /app

# 3. Copy all package*.json in the working director
COPY package*.json ./

# 4. Make npm install
RUN npm install

# 5. Copy all the folders of the project in the new working directory
COPY . .

# 6. Build the Angular app in production mod
RUN npm run build --prod

# 7. Install or Set up a server ou reverse-proxy
FROM nginx:alpine

# Copy our file nginx.conf to /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build-stage files into nginx/html
COPY --from=build-stage /app/dist/bsn-frontend /usr/share/nginx/html

# Expose port to listen nginx
EXPOSE 80

# Now, we will use localhost:80 to open our application
