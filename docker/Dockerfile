FROM python:3.9-slim-buster

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Install numpy for Python
RUN pip install numpy 
   
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
