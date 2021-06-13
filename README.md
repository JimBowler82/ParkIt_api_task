# ParkIt Web Development API Task

An API to perform CRUD (Create, Read, Update, Delete) operations on a simple user model.

Built with:

- Node (Express JS)
- SQlite3
- Joi

Tests built with:

- Supertest (including Moka & Chai) Moka & Chai

## Install this project

```bash
git clone https://github.com/JimBowler82/ParkIt_api_task.git
```

```bash
cd ParkIt_api_task
```

```bash
npm install
```

## Run the server

```bash
npm run start
```

A dev server is available using nodemon is available:

```bash
npm run dev
```

# API

### Base URL

```javascript
http://localhost:5000/api/v1
```

### Available endpoints

| Name           |  Verb  |     URL      |
| -------------- | :----: | :----------: |
| Get all users  |  GET   |   `/users`   |
| Get user by id |  GET   | `/users/:id` |
| Add user       |  POST  |   `/users`   |
| Update user    | PATCH  | `/users/:id` |
| Delete user    | DELETE | `/users/:id` |

# The User Model

The structure of the user model:

```json
{
  "id": 1,
  "email": "email@email.com",
  "givenName": "Joe",
  "familyName": "Bloggs",
  "created": "Sun, 13 Jun 2021 13:10:23 GMT",
  "updated": ""
}
```

# Tests

A supertest test suite is included
To run:

```javascript
npm run test
```

# Postman

A postman collection file can be found in `./Postman Collection` which you can import into your Postman program.
