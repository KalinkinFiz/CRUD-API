export const baseUrl = '/api/users';

export const headers = { 'Content-Type': 'application/json' };

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  N0_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ValidateMessage {
  UUID = 'Invalid uuid',
  ENDPOINT = 'Invalid endpoint',
  BODY = 'Invalid request body. The request body must contain the following fields: username - a string, age - a number, hobby - an array of strings',
}

export enum ErrorMessages {
  USER_NOT_FOUND = 'User not found',
  USER_DELETED = 'The user has been deleted',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}
