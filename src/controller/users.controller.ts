import * as http from 'http';

import { userModel, TUser } from '../models/index';
import { headers, ErrorMessages, StatusCode } from '../common/config';
import { response } from '../utils/response';

class UsersController {
  usersModel = userModel;
  headers = headers;

  getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      const users = await this.usersModel.getAllUsers();

      response(req, res, StatusCode.OK, this.headers, users);
    } catch (err) {
      response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
        message: `Error has been occurs during get users`,
      });
    }
  };

  getUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string,
  ) => {
    try {
      const user = (await this.usersModel.getUser(id)) as TUser;

      if (user) {
        response(req, res, StatusCode.OK, this.headers, user);
      } else {
        response(req, res, StatusCode.NOT_FOUND, this.headers, {
          message: ErrorMessages.USER_NOT_FOUND,
        });
      }
    } catch (err) {
      response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
        message: `Error has been occurs during get user`,
      });
    }
  };

  addUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    user: TUser,
  ) => {
    try {
      const newUser = (await this.usersModel.addUser(user)) as TUser;

      response(req, res, StatusCode.CREATED, this.headers, newUser);
    } catch (err) {
      response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
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
        response(req, res, StatusCode.NOT_FOUND, this.headers, {
          message: ErrorMessages.USER_NOT_FOUND,
        });
      } else {
        response(req, res, StatusCode.OK, this.headers, updatedUser);
      }
    } catch (err) {
      response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
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

      let message = '';
      if (statusCode === StatusCode.NOT_FOUND) {
        message = ErrorMessages.USER_NOT_FOUND;
      }
      if (statusCode === StatusCode.N0_CONTENT) {
        message = ErrorMessages.USER_DELETED;
      }

      response(req, res, statusCode, this.headers, { message });
    } catch (err) {
      response(req, res, StatusCode.INTERNAL_SERVER_ERROR, this.headers, {
        message: 'Error has been occurs during delete user',
      });
    }
  };
}

export const usersController = new UsersController();
