# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Expose port 3000 (to avoid conflict with IIS)
EXPOSE 3000

# Start the Vite preview server on port 3000
CMD ["npm", "run", "preview", "--", "--host", "--port", "3000"]
