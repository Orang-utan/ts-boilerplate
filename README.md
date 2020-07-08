# TS-Boilerplate

A monorepo boilerplate starter project for TypeScript, React, Express stack. If you want to checkout an example project based on TS-Boilerplate, check out [TS-Canvas](https://github.com/orang-utan/ts-canvas).

## Setting Up

#### Installing Requirements

```bash
$ git clone https://github.com/Orang-utan/ts-boilerplate.git
$ cd ts-boilerplate
$ yarn setup
```

#### Configuring Enviromental Variable

- Create file called ".env.development" in root directory
- In ".env.development", create new enviromental var: "ATLAS_URI=xxxxxxxxxxx"
- Create file called ".env" in "./src/client"
- "In .env", create new enviormental var: "REACT_APP_API_URL=http://localhost:5000"

#### Running Project

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```

#### To Deploy

Deploying this project on Heroku is dead simple. Basically, go on Heroku and create a new Heroku app, connect your project Github to your new Heroku app, and hit Deploy. Note, that you will need to configure the enviromental variable under settings.
