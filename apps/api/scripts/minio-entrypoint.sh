#!/bin/bash

# Start MinIO in the background
minio server /data --console-address ":9001" &
MINIO_PID=$!

# Wait for MinIO to be ready
echo "Waiting for MinIO to be ready..."
until mc alias set minio http://localhost:9000 superuser password 2>/dev/null; do
  echo "MinIO is not ready yet, waiting..."
  sleep 2
done

echo "MinIO is ready!"

# Create the bucket if it doesn't exist
echo "Creating bucket 'resala'..."
mc mb minio/resala --ignore-existing

# Set bucket policy to public read
echo "Setting bucket policy to public read..."
mc anonymous set public minio/resala

echo "Bucket 'resala' created and set to public successfully!"

# Wait for MinIO process
wait $MINIO_PID
