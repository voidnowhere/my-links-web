# MyLinks

## Run on docker for production
- build container
``` bash
docker build -t my-links-web .
```
- remove container
``` bash
docker rm -f my-links-web
```
- run container
``` bash
docker run -d -p 4200:80 --name my-links-web --rm my-links-web
```
