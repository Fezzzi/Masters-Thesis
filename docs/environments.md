# Environments
The application provides several environments, each is designed
to serve different purpose. Each of these environments then
offer different computation strategies.

## Standard Environments
Default ports for standard environments are
 - `8080` for api server
 - `8081` for web dev server
 
Both PR deployments and [staging](https://peachmarks-develop.herokuapp.com/) deployment on **Heroku** are
standard environments.

Both standard `dev` and `prod` environments offer only external
computation strategy where benchmarking is performed within
Azure pipelines. For more information, head to the documentation page
focused on [Computation Strategies](./strategies.md).

### Development
Most straightforward way to start the app in `dev` mode is by running
```
npm run dev
```
This starts `api` and `dev` servers concurrently from a single console window.
Both applications use hot reloading so any change it associated directories
(`code/[server|web]`) triggers rebooting of appropriate server.

Alternatively, these apps can be run individually with
```
npm run start-api
npm run start-web
```

### Production
To run the application in production mode, first, ensure you have
the latest `web` assets built in the `/dist` directory. If not, you
can build them with
```
npm run build
```
With all assets in place, start the server in production mode with
```
npm start
```

## Docker Environments
Default ports for docker environments are
 - `8000` for api server
 - `8001` for web dev server

Dockerized environments offer all computation strategies.

### Development
To run dockerized application in the `dev` mode, simply execute
```
docker-compose up --build
```
from the root of the repository. Optionally, the `--build` flag can be
omitted in case the latest image is already prepared.

### Production
Dockerized application can be also started in the `prod` mode, that
can be done with
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[Setup](./setup.md)</sup> | <sup>[API](./api.md)</sup> |
