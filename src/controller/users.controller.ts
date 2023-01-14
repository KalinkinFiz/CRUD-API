import * as http from 'http';

import { userModel } from '../models/user.model.js';
import { TUser } from '../models/user.type.js';
import { headers, errorMessages } from '../common/config.js';
import { response } from '../utils/response.js';

class UsersController {
  usersModel = userModel;
  headers = headers;

  getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      const users = await this.usersModel.getAllUsers();

      response(req, res, 200, this.headers, users);
    } catch (err) {
      response(req, res, 500, this.headers, {
        message: `Error has been occurs during get users`,
      });
    }
  };

  getUser = async (
    _req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string,
  ) => {
    try {
      const user = (await this.usersModel.getUser(id)) as TUser;

      if (user) {
        response(_req, res, 200, this.headers, user);
      } else {
        response(_req, res, 404, this.headers, {
          message: errorMessages.USER_NOT_FOUND,
        });
      }
    } catch (err) {
      response(_req, res, 500, this.headers, {
        message: `Error has been occurs during get user`,
      });
    }
  };

  addUser = async (
    _req: http.IncomingMessage,
    res: http.ServerResponse,
    user: TUser,
  ) => {
    try {
      const newUser = (await this.usersModel.addUser(user)) as TUser;

      response(_req, res, 201, this.headers, newUser);
    } catch (err) {
      response(_req, res, 500, this.headers, {
        message: 'Error has been occurs during add new user',
      });
    }
  };

  updateUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    user: TUser,
  ) => {
    try {
      const updatedUser = (await this.usersModel.updateUser(user)) as TUser;

      if (!updatedUser) {
        response(req, res, 404, this.headers, {
          message: errorMessages.USER_NOT_FOUND,
        });
      } else {
        response(req, res, 200, this.headers, updatedUser);
      }
    } catch (err) {
      response(req, res, 500, this.headers, {
        message: 'Error has been occurs during update user',
      });
    }
  };

  deleteUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string,
  ) => {
    try {
      const statusCode = await this.usersModel.deleteUser(id);

      if (statusCode === 404) {
        response(req, res, 404, this.headers, {
          message: errorMessages.USER_NOT_FOUND,
        });
      }

      if (statusCode === 204) {
        response(req, res, 204, this.headers, {
          message: errorMessages.USER_DELETED,
        });
      }
    } catch (err) {
      response(req, res, 500, this.headers, {
        message: 'Error has been occurs during delete user',
      });
    }
  };
}

export const usersController = new UsersController();
