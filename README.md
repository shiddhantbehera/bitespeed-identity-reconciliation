# BiteSpeed Identity Reconciliation

## 🔗 Link to Hosted App Swagger Documentation

You can explore the API endpoints and their details using the Swagger UI:

**URL**: [https://bitespeed-identity-reconciliation-mgi3.onrender.com/api/docs](https://bitespeed-identity-reconciliation-mgi3.onrender.com/api/docs)

---

## 🧪 Sample `curl` Request

```bash
curl -X POST https://bitespeed-identity-reconciliation-mgi3.onrender.com/identify-reconciliation \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mcfly@hillvalley.edu",
    "phoneNumber": "123456"
  }'
```
---

## Getting Started

```bash
$ git@github.com:shiddhantbehera/bitespeed-identity-reconciliation.git
```

## Installation

```bash
$ Install yarn: npm i -g yarn
$ run yarn or yarn add
```

## Environment

```
1. Rename .env.local to .env
2. Populate the respective env variables
3. Use port as 3000 for running the app.
```

## Running App locally Using Docker

```
1. Clone the Repository
2. cd bitespeed-identity-reconciliation
3. "docker compose up --build" for first time initialization otherwise "docker compose up"
4. Swagger URL: be-host/api/docs
```


## Running App locally without docker

```
1. Establish mysql database connection locally
2. Run Migration: yarn run db:migrate
3. Run BE APP: yarn run start:dev
```

## Swagger

```
URL: be-host/api/docs
```

## Build App

```bash
$ yarn run build
```
