# Storefront backend Api

project use node js and express to create store api.
app run on `Port 3000` host localhost

## EndPonints in app

all endpoints and schema described in   [REQUIREMENT.md](REQUIREMENTS.md) file, 

## scripts in app
 - Install all dependencies
```bash
npm install
```
 - Run prettier

```bash
npm run prettier
```
 - Run lint

```bash
npm run lint
```

 - Fix lint issus

```bash
npm run lint:fix
```

 - Run build app

```bash
npm run build
```

 - Run test app (will run build and test)

```bash
npm run test
```
 - Run migration to add tables to database
```bash
npm run migration:run
```

 - Down migration tables 
```bash
npm run migration:down
```
 - Reset migration tables 
```bash
npm run migration:reset
```
- Start app run  at route http://localhost:${port}

```bash
npm run start 
```

## DataBase
- Database Port 5432
- create database for dev mode (store_db_dev) using Postgres after create run script `npm run migration:run`  to run migrate .
- create database for test mode (store_db_test) using Postgres.


## Environmental file
- create .env file  in app root and copy data from .env.example file to .env file and update '###' with your environment data.


