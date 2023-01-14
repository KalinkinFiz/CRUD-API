import * as http from 'http';

import { baseUrl, errorMessages, headers } from '../common/config.js';
import { usersController } from '../controller/users.controller.js';
import { isValidId } from './validateId.js';
import { isValidUser } from './validateUser.js';
import { response } from './response.js';

export class Handler {
  baseUrl = baseUrl;
  headers = headers;

  handleReq(req: http.IncomingMessage, res: http.ServerResponse) {
    const { method, url } = req;

    if (!url?.startsWith(this.baseUrl)) {
      response(req, res, 404, this.headers, {
        message: errorMessages.endpoint,
      });
      return;
    }

    if (method === 'GET') {
      if (url === this.baseUrl) {
        usersController.getUsers(req, res).then(() => {});
      } else {
        const id = url?.split('/').pop();

        if (!id || !isValidId(id)) {
          response(req, res, 400, this.headers, {
            message: errorMessages.uuid,
          });
        } else usersController.getUser(req, res, id).then(() => {});
      }
    }

    if (method === 'POST') {
      if (url !== this.baseUrl) {
        response(req, res, 404, this.headers, {
          message: errorMessages.endpoint,
        });
      }
      let data = '';

      req.on('data', (chunk) => (data += chunk));
      req.on('error', (err) => {
        response(req, res, 500, this.headers, {
          message: `Error has been occurs. ${err.message}`,
        });
      });
      req.on('end', () => {
        const user = JSON.parse(data);

        if (!isValidUser(user)) {
          response(req, res, 400, this.headers, {
            message: errorMessages.body,
          });
        } else usersController.addUser(req, res, user).then(() => {});
      });
    }

    if (method === 'PUT') {
      const id = url?.split('/').pop();

      if (!id || !isValidId(id)) {
        response(req, res, 400, this.headers, { message: errorMessages.uuid });
      }

      let data = '';

      req.on('data', (chunk) => (data += chunk));
      req.on('error', (err) => {
        response(req, res, 500, this.headers, {
          message: `Error has been occurs. ${err.message}`,
        });
      });
      req.on('end', () => {
        const user = JSON.parse(data);

        if (!isValidUser(user)) {
          response(req, res, 400, this.headers, {
            message: errorMessages.body,
          });
        } else {
          usersController.updateUser(req, res, { ...user, id }).then(() => {});
        }
      });
    }

    if (method === 'DELETE') {
      const id = url?.split('/').pop();

      if (!id || !isValidId(id)) {
        response(req, res, 400, this.headers, { message: errorMessages.uuid });
      } else {
        usersController.deleteUser(req, res, id).then(() => {});
      }
    }
  }
}

export const handler = new Handler();
