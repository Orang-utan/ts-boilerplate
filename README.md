# TS-Boilerplate

Dead simple monorepo boilerplate web project designed to take you from Git Cloning to Heroku Deployment in less 5 minutes. 🚀🤩

It is built using the TypeScript, React, Express, Mongoose, MongoDB stack. If you want to checkout an example project based on TS-Boilerplate, check out [TS-Canvas](https://github.com/orang-utan/ts-canvas).

## Setting Up

#### Installing Requirements

```bash
$ git clone https://github.com/Orang-utan/ts-boilerplate.git
$ cd ts-boilerplate
$ yarn setup
```

##### Configuring Enviromental Variable

Create file called ".env.development" in root directory, it should look like the following:

```
ATLAS_URI=mongodb-connection-string-placeholder
JWT_SECRET=my-secret-jwt-key-placeholder
```

Then, create another file called ".env" in "src/client", it should look like the following:

```
REACT_APP_API_URL="http://localhost:5000"
```

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
