@echo on
docker login registry.digitalocean.com
docker build -t %IMAGE_NAME% .
docker tag henka:latest registry.digitalocean.com/dph/henka:latest
docker push registry.digitalocean.com/dph/henka:latest