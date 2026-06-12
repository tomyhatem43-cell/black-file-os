# Dockerfile for V6 Ultimate Backend
# Production-grade container for the Flask API + FFmpeg pipeline

FROM python:3.11-slim

# Install system dependencies including ffmpeg (required for the cinematic pipeline)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port
EXPOSE 5000

# Use gunicorn for production
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
