import * as http from 'http';

import { usersController } from '../controller/users.controller';
import { isValidId, isValidUser } from '../middlewares/index';
import { response } from './response';
import {
  baseUrl,
  headers,
  ValidateMessage,
  StatusCode,
} from '../common/config';

export class Handler {
  baseUrl = baseUrl;
  headers = headers;

  handleReq(req: http.IncomingMessage, res: http.ServerResponse) {
    const { method, url } = req;

    if (!url?.startsWith(this.baseUrl)) {
      response(req, res, StatusCode.NOT_FOUND, this.headers, {
        message: ValidateMessage.ENDPOINT,
      });
      return;
    }

    if (method === 'GET') {
      if (url === this.baseUrl) {
        usersController.getUsers(req, res).then(() => {});
      } else {
        const id = url?.split('/').pop();

        if (!id || !isValidId(id)) {
          response(req, res, StatusCode.BAD_REQUEST, this.headers, {
            message: ValidateMessage.UUID,
          });
        } else usersController.getUser(req, res, id).then(() => {});
      }
    }

    if (method === 'POST') {
      if (url !== this.baseUrl) {
        response(req, res, StatusCode.NOT_FOUND, this.headers, {
          message: ValidateMessage.UUID,
        });
      }
      let data = '';

      req.on('data', (chunk) => (data += chunk));
      req.on('error', (err) => {
        response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
          message: `Error has been occurs. ${err.message}`,
        });
      });
      req.on('end', () => {
        const user = JSON.parse(data);

        if (!isValidUser(user)) {
          response(req, res, StatusCode.BAD_REQUEST, this.headers, {
            message: ValidateMessage.BODY,
          });
        } else usersController.addUser(req, res, user).then(() => {});
      });
    }

    if (method === 'PUT') {
      const id = url?.split('/').pop();

      if (!id || !isValidId(id)) {
        response(req, res, StatusCode.BAD_REQUEST, this.headers, {
          message: ValidateMessage.UUID,
        });
        return;
      }

      let data = '';

      req.on('data', (chunk) => (data += chunk));
      req.on('error', (err) => {
        response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
          message: `Error has been occurs. ${err.message}`,
        });
      });
      req.on('end', () => {
        const user = JSON.parse(data);

        if (!isValidUser(user)) {
          response(req, res, StatusCode.BAD_REQUEST, this.headers, {
            message: ValidateMessage.BODY,
          });
        } else {
          usersController.updateUser(req, res, { ...user, id }).then(() => {});
        }
      });
    }

    if (method === 'DELETE') {
      const id = url?.split('/').pop();

      if (!id || !isValidId(id)) {
        response(req, res, StatusCode.BAD_REQUEST, this.headers, {
          message: ValidateMessage.UUID,
        });
      } else {
        usersController.deleteUser(req, res, id).then(() => {});
      }
    }
  }
}

export const handler = new Handler();
