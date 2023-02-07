# Installing docker

1) go to https://download.docker.com/ and download packages suitable for your system

2) install your packages

<b>Example on isaks machine:</b><br>
<code>sudo dpkg -i ./containerd.io_1.5.10-1_amd64.deb \\
./docker-ce_20.10.13\~3-0\~ubuntu-jammy_amd64.deb \\
./docker-ce-cli_20.10.13\~3-0\~ubuntu-jammy_amd64.deb \\
./docker-compose-plugin_2.10.2~ubuntu-jammy_amd64.deb
</code>

## Testing installation

1) sudo docker run hello-world

2) service docker status

### Entering a container

<code>docker exec -it \<container id\> /bin/bash</code>
