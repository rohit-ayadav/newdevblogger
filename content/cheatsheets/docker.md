# Docker Cheatsheet: Complete Guide for Developers & DevOps

## What is Docker?

**Docker** is a platform that uses containerization technology to package applications and their dependencies together in isolated environments called containers.

- **Why use Docker?** 
  - Consistent environments across development, testing, and production
  - Lightweight alternative to virtual machines
  - Easy application distribution and scaling
  - Isolated dependencies and libraries

- **Docker vs Virtual Machines:**
  - Containers share the host OS kernel (smaller, faster)
  - VMs include entire OS copy (larger, slower to start)
  - Containers start in seconds; VMs take minutes

## Docker Architecture Explained

- **Docker Daemon (dockerd):** 
  - Background service that manages Docker objects
  - Listens for Docker API requests

- **Docker CLI:**
  - Command-line interface to interact with Docker
  - Communicates with Docker daemon via API

- **Docker Engine:**
  - Combines the daemon and CLI
  - Core of the Docker platform

- **Images vs Containers:**
  - **Image:** Read-only template with instructions for creating a container
  - **Container:** Running instance of an image with its own filesystem, network, and isolated process space

## Common Docker Commands

### Image Commands

```bash
# List all images
docker images

# Pull an image from Docker Hub
docker pull ubuntu:20.04

# Build an image from Dockerfile
docker build -t myapp:1.0 .

# Remove an image
docker rmi image_id

# Tag an image
docker tag myapp:1.0 username/myapp:1.0

# Push to Docker Hub
docker push username/myapp:1.0

# Search Docker Hub
docker search nginx
```

### Container Commands

```bash
# Run a container
docker run -d --name web -p 8080:80 nginx

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop container_id

# Start a stopped container
docker start container_id

# Remove a container
docker rm container_id

# Execute command in running container
docker exec -it container_id bash

# View container logs
docker logs container_id

# Copy files from/to container
docker cp file.txt container_id:/path
docker cp container_id:/path/file.txt ./
```

### Network & Volume Commands

```bash
# List networks
docker network ls

# Create a network
docker network create mynetwork

# Connect container to network
docker network connect mynetwork container_id

# List volumes
docker volume ls

# Create a volume
docker volume create myvolume

# Inspect a volume
docker volume inspect myvolume
```

### System Commands

```bash
# System information
docker info

# Disk usage
docker system df

# Clean unused containers, networks, images
docker system prune

# Remove all unused images, not just dangling ones
docker system prune -a

# Remove unused volumes
docker system prune --volumes
```

## Dockerfile Cheatsheet

### Basic Structure

```dockerfile
# Start from base image
FROM ubuntu:20.04

# Set working directory
WORKDIR /app

# Copy files from host to container
COPY . .

# Run commands during build
RUN apt-get update && apt-get install -y python3

# Set environment variables
ENV NODE_ENV=production

# Expose ports
EXPOSE 3000

# Run when container starts
CMD ["python3", "app.py"]
```

### Common Instructions

- **FROM:** Specifies the base image
- **WORKDIR:** Sets the working directory
- **COPY/ADD:** Copies files from host to container (ADD can also handle URLs and tar extraction)
- **RUN:** Executes commands during build
- **ENV:** Sets environment variables
- **EXPOSE:** Documents which ports the container listens on
- **CMD:** Default command to run when container starts
- **ENTRYPOINT:** Similar to CMD, but harder to override
- **VOLUME:** Creates a mount point for external volumes

### Multi-stage Builds

```dockerfile
# Build stage
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Best Practices

- Use specific tags for base images, not `latest`
- Group related commands with `&&` to reduce layers
- Use `.dockerignore` to exclude unnecessary files
- Remove package manager caches in the same RUN step
- Keep images small by using Alpine-based images
- Order instructions from least to most frequently changing

## Docker Compose Cheatsheet

### docker-compose.yml Structure

```yaml
version: '3'

services:
  web:
    build: ./web
    ports:
      - "8080:80"
    volumes:
      - ./web:/code
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/dbname

  db:
    image: postgres:12
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=pass
      - POSTGRES_USER=user
      - POSTGRES_DB=dbname

volumes:
  postgres_data:
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Build or rebuild services
docker-compose build

# View logs
docker-compose logs

# Run command in service container
docker-compose exec web bash

# List containers
docker-compose ps

# Check configuration
docker-compose config
```

## Docker Volumes & Bind Mounts

### Types of Storage

1. **Volumes:** Managed by Docker, stored in `/var/lib/docker/volumes/`
2. **Bind Mounts:** Path on host system mounted into container
3. **tmpfs Mounts:** Stored in host system memory only

### Usage Syntax

```bash
# Create and use a volume
docker run -v myvolume:/app/data nginx

# Bind mount (absolute path)
docker run -v /host/path:/container/path nginx

# Bind mount (relative path)
docker run -v $(pwd):/container/path nginx

# Read-only mount
docker run -v myvolume:/app/data:ro nginx

# tmpfs mount
docker run --tmpfs /app/temp nginx
```

### Tips for Persistent Data

- Use named volumes for better management
- For development, use bind mounts to reflect code changes immediately
- Back up important volumes regularly with `docker volume backup`
- Add volume labels for organization: `docker volume create --label=project=myapp data_volume`

## Networking in Docker

### Network Types

- **bridge:** Default network for containers on same host
- **host:** Container uses host's network stack directly
- **none:** No networking
- **overlay:** Connect containers across multiple Docker hosts
- **macvlan:** Assign MAC address to container

### Network Commands

```bash
# Create a network
docker network create mynetwork

# Create with specific driver
docker network create --driver overlay mynetwork

# Connect container to network
docker network connect mynetwork container_id

# Disconnect container from network
docker network disconnect mynetwork container_id

# Inspect network
docker network inspect mynetwork
```

### Port Mapping

```bash
# Map container port 80 to host port 8080
docker run -p 8080:80 nginx

# Map UDP port
docker run -p 53:53/udp dns-server

# Map all exposed ports to random ports
docker run -P nginx
```

## Docker Image Management

### Creating and Optimizing Images

```bash
# Build with tag
docker build -t myapp:1.0 .

# Build with build arguments
docker build --build-arg VERSION=1.2 -t myapp:1.2 .

# Build without using cache
docker build --no-cache -t myapp:1.0 .
```

### Tagging and Pushing

```bash
# Tag image
docker tag myapp:1.0 username/myapp:1.0

# Push to registry
docker push username/myapp:1.0

# Pull from registry
docker pull username/myapp:1.0
```

### Minimizing Image Size

- Use Alpine-based images when possible
- Clean package manager caches in same RUN step
- Use multi-stage builds to exclude build tools
- Remove unnecessary files
- Use `.dockerignore` to exclude files from build context

Example `.dockerignore`:
```
node_modules
.git
*.log
```

## Docker Container Lifecycle

### Container States

- **Created:** Container created but not started
- **Running:** Container running with processes active
- **Paused:** Container processes paused
- **Exited:** Container stopped, processes terminated
- **Dead:** Container failed to terminate properly

### Container Commands Based on Lifecycle

```bash
# Create but don't start
docker create --name mycontainer nginx

# Start created container
docker start mycontainer

# Pause running container
docker pause mycontainer

# Unpause container
docker unpause mycontainer

# Stop container (SIGTERM, then SIGKILL)
docker stop mycontainer

# Kill container (SIGKILL immediately)
docker kill mycontainer
```

### Restart Policies

```bash
# Always restart (including on daemon restart)
docker run --restart always nginx

# Restart on failure only
docker run --restart on-failure nginx

# Restart on failure with max retry count
docker run --restart on-failure:5 nginx

# Never restart (default)
docker run --restart no nginx
```

### Inspecting Logs and Stats

```bash
# View logs
docker logs container_id

# Follow logs
docker logs -f container_id

# Show timestamps
docker logs -t container_id

# Show container resource usage stats
docker stats container_id

# Inspect container details
docker inspect container_id
```

## Docker Tips & Tricks

- **Use `.dockerignore`** to exclude files from build context, improving build speed
- **Layer caching:** Order Dockerfile instructions from least to most frequently changing
- **Use multi-stage builds** to create smaller production images
- **Label your containers** for better organization:
  ```bash
  docker run --label com.example.project=myapp nginx
  ```
- **Use environment variables** for configuration:
  ```bash
  docker run -e DEBUG=true myapp
  ```
- **Mount source code as volume** during development for faster iterations
- **Use `docker-compose` for local development** environments with multiple services
- **Check image contents before deployment:**
  ```bash
  docker run -it --rm myimage ls -la /app
  ```

## Common Docker Problems & Solutions

### Container Exiting Immediately

**Problem:** Container stops right after starting
**Solutions:**
- Container needs a foreground process; use `tail -f /dev/null` to keep alive
- Check logs: `docker logs container_id`
- Use interactive mode: `docker run -it image_name bash`

### Port Already in Use

**Problem:** "Error starting userland proxy: listen tcp 0.0.0.0:8080: bind: address already in use"
**Solutions:**
- Check running processes: `sudo lsof -i :8080`
- Stop container using that port
- Use different port mapping: `docker run -p 8081:80 nginx`

### Volume Permissions Issues

**Problem:** "Permission denied" when writing to mounted volume
**Solutions:**
- Change permissions on host directory: `chmod 777 /host/path`
- Run container as specific user: `docker run -u $(id -u):$(id -g) image_name`
- Set permissions inside container: `RUN chown -R user:user /app`

### Docker Not Starting

**Problem:** Docker daemon won't start
**Solutions:**
- Check service status: `systemctl status docker`
- Check logs: `journalctl -u docker.service`
- Restart daemon: `sudo systemctl restart docker`
- On Windows: Restart WSL2 or Docker Desktop

## Docker Security Best Practices

- **Don't run as root** inside containers:
  ```dockerfile
  RUN useradd -m appuser
  USER appuser
  ```

- **Scan images for vulnerabilities:**
  ```bash
  docker scan myimage
  # Or use tools like Trivy, Clair, Anchore
  ```

- **Set resource limits:**
  ```bash
  docker run --memory="512m" --cpus="0.5" nginx
  ```

- **Use official or verified images** from Docker Hub

- **Keep images updated** with security patches

- **Remove unnecessary packages** and keep images minimal

- **Use read-only filesystem** when possible:
  ```bash
  docker run --read-only nginx
  ```

- **Set seccomp and AppArmor profiles** for additional security:
  ```bash
  docker run --security-opt seccomp=/path/to/profile.json nginx
  ```

## Docker in CI/CD Pipelines

### GitHub Actions Example

```yaml
name: Docker CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and tag
        uses: docker/build-push-action@v2
        with:
          context: .
          push: false
          tags: myapp:latest
          
      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
          
      - name: Push image
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: username/myapp:latest
```

### Jenkins Pipeline Example

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm myapp:${BUILD_NUMBER} npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker tag myapp:${BUILD_NUMBER} myapp:latest'
                sh 'docker push myapp:latest'
            }
        }
    }
}
```

### Caching Dependencies

- Use buildkit for better caching:
  ```bash
  DOCKER_BUILDKIT=1 docker build .
  ```

- Use multi-stage builds to cache dependencies:
  ```dockerfile
  FROM node:14 AS deps
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  
  FROM node:14-alpine
  WORKDIR /app
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  CMD ["npm", "start"]
  ```

## Useful Docker Resources & Tools

- **Official Documentation:** [docs.docker.com](https://docs.docker.com/)
- **Play with Docker:** Online Docker playground [labs.play-with-docker.com](https://labs.play-with-docker.com/)
- **Dive:** Tool for exploring Docker image layers [github.com/wagoodman/dive](https://github.com/wagoodman/dive)
- **DockerSlim:** Minify Docker images [github.com/docker-slim/docker-slim](https://github.com/docker-slim/docker-slim)
- **Portainer:** Web UI for Docker management [portainer.io](https://www.portainer.io/)
- **docker-compose-viz:** Visualize docker-compose files [github.com/pmsipilot/docker-compose-viz](https://github.com/pmsipilot/docker-compose-viz)
- **DockStation:** Desktop Docker UI [dockstation.io](https://dockstation.io/)

## FAQs for Beginners

**Is Docker free?**
Docker comes in both free (Docker Community Edition) and paid versions (Docker Desktop Enterprise). The core technology is open-source.

**Can I use Docker on Windows Home?**
Yes, with Docker Desktop for Windows, which requires Windows 10 Home (version 1903 or higher) with WSL2 enabled.

**Do I need Kubernetes with Docker?**
Not necessarily. Docker Compose is sufficient for simpler applications. Kubernetes is helpful for more complex, production-scale deployments with multiple services.

**What's Docker Swarm?**
Docker's native clustering and orchestration solution, an alternative to Kubernetes for managing containers across multiple hosts.

**How secure are Docker containers?**
Containers provide isolation but aren't as secure as VMs. Follow security best practices for higher security.

## Docker Interview Questions

1. **What is Docker and why use it?**
   - Docker is a platform for developing, shipping, and running applications in containers.
   - Benefits: consistency across environments, lightweight, efficient resource usage, isolation.

2. **What is the difference between a Docker image and a container?**
   - Image: Read-only template with instructions for creating a container
   - Container: Running instance of an image with its own process space, networking, and filesystem

3. **Explain Docker architecture**
   - Client-server architecture with:
   - Docker client (CLI), Docker daemon (server), Registry, Objects (images, containers, networks, volumes)

4. **What is Docker Compose?**
   - Tool for defining and running multi-container Docker applications using YAML configuration files

5. **What is a Dockerfile?**
   - Text document with instructions to build a Docker image automatically

6. **How can you reduce Docker image size?**
   - Use Alpine-based images
   - Multi-stage builds
   - Combine RUN commands with &&
   - Clean package manager caches
   - Remove unnecessary files
   - Use .dockerignore

7. **Explain Docker networking**
   - Docker creates bridge/host/overlay networks
   - Containers can communicate via these networks
   - Port mapping exposes container ports to the host

8. **What is a Docker volume and why use it?**
   - Mechanism for persistent data storage independent of container lifecycle
   - Data persists even if container is removed

9. **Difference between COPY and ADD in Dockerfile**
   - COPY: Simply copies files from source to destination
   - ADD: Can also unpack compressed files and accept URLs

10. **What is the difference between CMD and ENTRYPOINT?**
    - CMD: Default command that can be overridden at runtime
    - ENTRYPOINT: Command that will always run when container starts, harder to override

---

*Keywords: docker commands list, dockerfile best practices, docker compose tutorial, how to fix docker permission denied, docker volume vs bind mount, optimize docker image size, docker security tips, docker not working in windows 11, container vs virtual machine, docker networking explained, docker tutorial for beginners, docker in production, docker ci/cd pipeline*