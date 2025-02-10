FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy application files
COPY --from=publish /app/publish .

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY startup.sh .
RUN chmod +x ./startup.sh

# Set entry point
ENTRYPOINT ["./startup.sh"]
