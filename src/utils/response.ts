import * as http from 'http';

import { ErrorMessage } from '../utils/errorMessage.js';
import { TUser } from '../models/user.type.js';
import { logRequest } from './logRequest.js';

export const response = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  statusCode: number,
  headers: Record<string, string>,
  result: TUser | TUser[] | ErrorMessage,
) => {
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(result));
  logRequest(req, statusCode);
};
