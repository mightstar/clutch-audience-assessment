# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose a port (e.g., 3000) that your application will listen on
EXPOSE 3000

# Define the command to start your Express application
CMD ["npm", "run", "dev"]
