# Forum API

## Setup

Firstly you need to set `.env` file. There is an example in `.env.example`.
<br>
After that you need to a database. There is a docker-compose.yml file into `environment/develop/docker-compose.yml`. The following example up it.

```
docker-compose -f ./environment/develop/docker-compose.yml --env-file ./.env up
```

## API Documentation

The API is documented in [Swagger](https://swagger.io/). You can find it in `localhost:APP_PORT/api`.

