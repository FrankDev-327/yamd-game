# Yamd Game

Welcome! This readme file will guide you through the setup process and explain the configuration values needed to run the project.

## Setup

To get started with the project, you'll need to follow these steps:

1. Clone the repository: `git@github.com:FrankDev-327/yamd-game.git`
2. Navigate to the project directory: `cd yamd-game`
3. Install the dependencies: `pnpm install` (if you have it installed), or `npm install`

## Configuration

Before running the project, you need to set up some configuration values. These values are sensitive and should not be shared or stored directly in the codebase. Instead, they should be kept in a separate `.env` file.

Create a `.env` file in the root directory of the project and copy the content from `.env.test.example` into it. Then, replace the placeholder values with your actual configuration:

```bash
DB_URL='postgres://your-username:your-password@your-host/your-database'
PORT_SERVER=8000
SECRET_SOCKET_KEY='your-secret-key'
```

## Run project (Backend side)
To be able to run this project, use this command `pnpm run start:dev` when everything has been configurated

## Play
To play, you have to go to resources, and then click on `single-multi-player.html` and star to play.

## Test
To be able to run some tests, just copy this command into the terminal `pnpm run test:unit` or `npm run test:unit`.
If you want to see more information about the test, you can add the flag at the end `--coverage`

## Swagger
Through this url `http://localhost:8000/docs/#/` you are going to have access to the swagger view