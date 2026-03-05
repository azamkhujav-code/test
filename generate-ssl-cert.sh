#!/bin/bash

# Create SSL directory if it doesn't exist
mkdir -p src/server/ssl

# Generate SSL certificate and key
openssl req -x509 -newkey rsa:4096 -keyout src/server/ssl/key.pem -out src/server/ssl/cert.pem -days 365 -nodes -subj "/CN=localhost"

echo "Self-signed SSL certificate generated successfully."