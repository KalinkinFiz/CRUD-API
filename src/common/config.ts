// import * as dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({
//   path: path.join(__dirname, '../../.env'),
// });

// const { SERVER_PORT } = process.env;

// export const config = {
//   PORT: SERVER_PORT ?? 4000,
// };

export const baseUrl = '/api/users';

export const headers = { 'Content-Type': 'application/json' };

export enum errorMessages {
  uuid = 'Invalid uuid',
  endpoint = 'Invalid endpoint',
  body = 'Invalid request body. The request body must contain the following fields: username - a string, age - a number, hobby - an array of strings.',
  USER_NOT_FOUND = 'User not found',
  USER_DELETED = 'The user has been deleted',
}
