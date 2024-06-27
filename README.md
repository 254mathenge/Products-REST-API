<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  

- [Running a Prisma Project](#running-a-prisma-project)
  - [1.Set Up the Project](#1set-up-the-project)
    - [2. Set Up Prisma](#2-set-up-prisma)
  - [3. Set Up Express](#3-set-up-express)
  - [4.Create REST API Endpoints](#4create-rest-api-endpoints)
  - [5.Test the API](#5test-the-api)
    - [Start your Express server:](#start-your-express-server)
    - [Use a tool like Postman or insomnia to test your API endpoints:](#use-a-tool-like-postman-or-insomnia-to-test-your-api-endpoints)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Running a Prisma Project
## 1.Set Up the Project
<ul>
 <li> Initialize a new Node.js project: </li>

 ```
 mkdir my-prisma-project
cd my-prisma-project
npm init -y
```
<li>install necessary dependencies:</li>

```
npm install express prisma @prisma/client @prisma/
```
</ul>

### 2. Set Up Prisma
<ul>
<li>Initialize Prisma:</li>

```
npx prisma init
```
<li>Configure the database connection:</li>
Open the .env file and set your PostgreSQL database connection string

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public"
```
<li>Define your data model:</li>
Open the prisma/schema.prisma file and define your data model:

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```
<li>Migrate the database:</li>

```
npx prisma migrate dev --name init
```

</ul>

## 3. Set Up Express
<ul>
<li>Create an Express server:</li>
Create a file named index.js

```const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
</ul>

## 4.Create REST API Endpoints
Add CRUD endpoints for the products model

## 5.Test the API

### Start your Express server:

```
npm run dev
```
### Use a tool like Postman or insomnia to test your API endpoints:
<ul>
<li>Get all products: GET http://localhost:3000/products</li>
<li>Get a products by ID: GET http://localhost:3000/products/1</li>
<li>Create a new product: POST http://localhost:3000/products with JSON body </li>{ "title": "clothes", "thumbnail": "thumbnail" }</li>
<li>Update a products: PUT http://localhost:3000/products/1 with JSON body { "title": "clothes", "thumbnail": "thumbnail" }</li>
<li>Delete a product: DELETE http://localhost:3000/products/1</li>
</ul>