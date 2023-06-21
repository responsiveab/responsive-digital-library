# Troubleshooting Steps for Docker and Docker Compose

Docker and Docker Compose are powerful tools for containerization and application deployment. However, like with any technology, problems occur. Here are some common troubleshooting steps for Docker and Docker Compose:

## Docker Troubleshooting

### 1. Check Docker Status

The first thing to do is to check if Docker is running properly. On **macOS** and **Windows** make sure the Docker GUI application is running.

Use the following command to check the Docker status on **Ubuntu**:

<code>sudo systemctl status docker</code>

You can start the Docker daemon/engine on **Ubuntu** by running the following command:

<code>sudo systemctl start docker</code>

<br>If you receive an error message like this "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?" then this is likely the issue.

### 2. Check Docker Logs

If you encounter an error while running a Docker container, check the Docker logs to identify the issue. Use the following command to view the logs:

<code>docker logs \<container-id\></code>

## Docker Compose Troubleshooting

### 1. Check Docker Compose Logs

If you encounter an error while running a Docker Compose, check the Docker Compose logs to identify the issue. Use the following command to view the logs:

<code>docker-compose logs</code>

### 2. Check container status:

If your containers are not running as expected, use the command `docker-compose ps` to check the status of your containers.

### 3. Restart containers:

Try restarting your containers by running the command `docker-compose restart`.

### 4. Remove volumes and rebuild containers:

If restarting your containers doesn't work, try removing the volumes and rebuilding your Docker Compose containers. To remove all volumes associated with your Docker Compose project, use the command `docker-compose down -v`. Once the volumes are removed, use the command `docker-compose up --build` to rebuild the containers.

### 5. Remove all containers, networks, and images:

If the previous step doesn't work, try removing and rebuilding all containers, networks, and images associated with the project. Use the command `docker-compose down --rmi all` followed by `docker-compose up --build` in order for Docker to rebuild all containers, networks, and images from scratch.

### 6. Verify dependencies:

Make sure that any dependencies required by your project are properly installed and configured in the Docker containers.

## Common errors and how to fix them:

By looking at the log provided by `docker-compose up` or using the command `docker-compose logs` you can usually understand what's wrong. Here are some errors I've stumbled across:

#### Error: responsive-library-node-server `Module not found: Error: Can't resolve 'cors' in '/usr/src/app/src'` and `npm ERR! Exit status 1` and similar error messages.

This error usually occurs when the Docker container hasn't been updated with the new dependencies. This happens if a contributor has added new dependencies to the `package.json` file.

**Solution:** First remove the Docker volumes using the command `docker-compose down -v` and then rebuild the Docker containers using the command `docker-compose up --build`.

#### Error: responsive-library-react-client `Module not found: Can't resolve 'axios' in '/usr/app/src/pages'` and `Failed to compile.` and similar error messages.

This error usually occurs when the Docker container hasn't been updated with the new dependencies. This happens if a contributor has added new dependencies to the `package.json` file.

**Solution:** First remove the Docker volumes using the command `docker-compose down -v` and then rebuild the Docker containers using the command `docker-compose up --build`.

##

<br>By following these troubleshooting steps, you should be able to identify and resolve most issues with Docker Compose :smile:.
