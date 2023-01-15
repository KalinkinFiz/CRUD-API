import * as http from 'http';

import { IErrorMessage } from '../common/errorMessage.js';
import { TUser } from '../models/user.type.js';
import { logRequest } from '../middlewares/index.js';

export const response = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  statusCode: number,
  headers: Record<string, string>,
  result: TUser | TUser[] | IErrorMessage,
) => {
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(result));
  logRequest(req, statusCode);
};
