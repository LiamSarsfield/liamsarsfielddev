# Use the NGINX Alpine image as the base image
FROM nginx:alpine

# Set the container name
LABEL container_name="liamsarsfielddev"

# Expose port 80
EXPOSE 80 443

# Copy the SPA files to the NGINX document root
COPY ./spa /var/www/public

# Copy the NGINX configuration files
COPY ./build/nginx/conf.d/ /etc/nginx/conf.d/

# The CMD instruction provides defaults for an executing container.
# This is where you would put the command to run NGINX in the foreground.
CMD ["nginx", "-g", "daemon off;"]
