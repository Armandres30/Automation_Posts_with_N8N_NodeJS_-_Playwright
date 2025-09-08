# Use the existing image as the base
FROM n8nio/n8n:latest

# Install necessary dependencies for Playwright
RUN apk add --no-cache \
    bash \
    curl \
    && curl -sL https://unofficial-builds.nodejs.org/download/release/v14.17.0/node-v14.17.0-linux-x64.tar.xz | tar -xJ -C /usr/local --strip-components=1 \
    && npm install -g playwright \
    && npm i --save-dev @types/node

# Set the working directory
WORKDIR /app

# Copy your project files into the container
COPY . .

# Command to keep the container running
CMD ["tail", "-f", "/dev/null""]