# Code Tour

## Root Directory

src/ -- This is where all of the backend + frontend source code lives

.env.development -- Your enviromental variables

.eslintignore -- Folders to be ignored by ESLint (i.e. the Client folder)

.eslintrc -- ESLint configurations (i.e. Lint according to Airbnb conventions)

.gitignore -- Folders to be ignored by Git

.prettierrc -- Prettier configurations

.package.json -- Node Packages

.Procfile -- File needed for Heroku deployment

tsconfig.json -- TypeScript configurations

yarn.lock -- Dependency file auto generated on "yarn install"

## Server Directory (src/)

client/ -- Our React frontend

middleware/ -- Middleware used by our API (i.e. authentication)

models/ -- Where our database models live (defined via Mongoose)

routes/ -- All of the important API and controller logic happens

types/ -- Custom type definition files for TypeScript compilation

utils/ -- Utility functions (i.e. Database connnection, email client, etc)

index.ts -- Main entry file for our server

## Client Directory (src/client/)

public/ -- Target folder when building React into static HTML

src/ -- Our actual src directory

src/api -- All of our API clients and logic

src/components -- Where we define all of our reusable React components

src/pages -- Where we define a new page, and React router

src/types -- Custom type definition files for TypeScript compilation

src/utils -- Utility files such as configurations

src/index.tsx -- Our client entry point
