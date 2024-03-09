# Use the official Node.js runtime as the base image
# FROM node:21-alpine

# Set the working directory in the container
# WORKDIR /shopeeclone

# Copy package.json and package-lock.json to the working directory
# COPY package.json ./

# Install dependencies
# RUN yarn install

# Copy the entire application code to the container
# COPY . .

# Build the React app for production
# RUN yarn build

# Use Nginx as the production server
# FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
# COPY /shopeeclone/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
# EXPOSE 8000

# Start Nginx when the container runs
# CMD ["nginx", "-g", "daemon off;"]

# CMD ["yarn", "run", "dev"]


# docker build -t shopeeclone-app .
# docker run --name shopeeclone-app -p 8080:8000 -d shopeeclone-app


# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 8000

# CMD [ "npm", "run", "preview" ]

# docker build . -t "sample-project:v1.0"
# docker run -p 8080:8080 sample-project:v1.0

FROM node:21-alpine
WORKDIR /shopeeclone
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8000
CMD ["yarn", "run", "preview"]

# docker build -t shopeeclone-app .
# docker run --name shopeeclone-app -p 8080:8000 -d shopeeclone-app
