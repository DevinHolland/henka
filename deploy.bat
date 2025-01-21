@echo on
docker login registry.digitalocean.com
docker build -t henka:latest .
docker tag henka:latest registry.digitalocean.com/dph/henka:latest
docker push registry.digitalocean.com/dph/henka:latest