# Application Setup
### Requirements
 - git (obviously)
 - npm
 - docker
 - Node (ts-node)

### Versions
 - **Node:** 12+

## How to set up and run project
1. clone the repository
1. run `npm install` and `npm run configure` from the project root
1. create a copy of `.env.example`, rename it to`.env`
1. run `npm run dev`

## Environmental variables
 - **API_PORT** - Port api will start on, defaults to `8080`
 - **DEV_PORT** - Port web dev server will start on, defaults to `8081`
 - **LOGS_PATH** - Directory for server logs, relative to `./code/server/`, defaults to `logs`
 - **DEBUG** - Runs clients in `debug` mode (there might not be any difference)

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[API](./api.md)</sup> | <sup>[🠔 Back](./readme.md)</sup> |
