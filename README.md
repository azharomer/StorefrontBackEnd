# Storefront backend Api

project use node js and express to create store api.

## EndPonints in app

all endpoints and schema described in  `REQUIREMENTS.md` file, 

## scripts in app
Run prettier

```bash
npm run prettier
```
Run lint

```bash
npm run lint
```

Fix lint issus

```bash
npm run lint:fix
```

Run build app

```bash
npm run build
```

Run test app (will run build and test)

```bash
npm run test
```

Start app

```bash
npm run start
```
run migration to add tables to database
```bash
npm run migration:run
```

Down migration tables 
```bash
npm run migration:down
```
Reset migration tables 
```bash
npm run migration:reset
```
## DataBase
- create database for dev mode (store_db_dev) using Postgres after create run script `npm run migration:run`  to run migrate.
- create database for test mode (store_db_test) using Postgres

## Environmental file
- create .env file  in app root and copy data from .env.example file to .env file and update '###' with your environment data.


