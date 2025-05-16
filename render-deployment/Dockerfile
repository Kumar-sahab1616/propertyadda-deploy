FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build:backend

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start:prod"]