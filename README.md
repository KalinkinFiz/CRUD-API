# RS School CRUD-API

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and
  the npm package manager.

## Downloading

```
git clone -b dev https://github.com/KalinkinFiz/CRUD-API
```

```
cd CRUD-API
```

## Installing NPM modules

```
npm install
```

## Running application

1. Add data on `.env.template`

   For example:

   ```
   SERVER_PORT=4000
   ```

2. Rename `.env.template` on `.env`

3. Running the application in the **development mode** (entered into the
   console):

   ```
   npm run start:dev
   ```

   If everything goes well, then a message `🚀 Server ready on SERVER_PORT`
   should appear in the console

4. Running the application in the **production mode** (entered into the
   console):

   ```
   npm run start:prod
   ```

   If everything goes well, then the `build` folder should appear and the
   message `🚀 Server ready on SERVER_PORT` should appear in the console.

5. Running the application in the **cluster mode** (not working yet):
   ```
   npm run start:multi
   ```

## Testing

**Attention! The server must not be running**

```
npm run test
```

## Request methods

- **GET** `'/api/users'`:

  - **200** - array of users

- **GET** `'/api/users/:id'`:

  - **200** - user with id
  - **400** - id is not valid uuid
  - **404** - user not found

- **POST** `'/api/users'`:

  - **201** - created user
  - **400** - body request is not valid

  Structure of the object to create a new user:

  ```
  {
      "username": "Maxim",
      "age": 26,
      "hobbies": ["TypeScript"]
  }
  ```

- **PUT** `'/api/users/:id'`:

  - **200** - updated user object
  - **400** - id is not valid or request body
  - **404** - user not found

- **DELETE** `'/api/users/:id'`:

  - **204** - user deleted
  - **400** - id is not valid or request body
  - **404** - user not found
