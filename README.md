# CONECTAR CHALLENGE BACK - NEST.JS

## Description

Tech:
- Nest.JS
- Sqlite3
- TypeOrm
- Bcrypt
- Jest

## Architecture

Arquitetura MVC

- **Model** são as **Entidades**
- **View** são os **Controllers**
- **Controllers** são os **Serviços**

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```


## Folder Structure

`src` - Pasta em que se encontra todos os arquivos *.ts

`core` - Pasta para aglomerar tudo aquilo que não é convencional a um módulo

`utils` - Pasta de utilitários para uso geral

```bash
.
├── src
│   ├── core
│   │   ├── enum
│   │   └── utils
│   ├── <module>
│   │   ├── decorators
│   │   ├── dto
│   │   ├── entities
│   │   ├── guards
│   │   ├── <module>.guard.ts
│   │   ├── <module>.controller.ts
│   │   └── <module>.service.ts
│   └── app.module.ts
├── package.json
└── README.md
```


