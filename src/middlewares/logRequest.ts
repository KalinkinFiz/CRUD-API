import * as http from 'http';

export const logRequest = (req: http.IncomingMessage, statusCode: number) => {
  process.stdout.write(`${req.method} ${req.url} ${statusCode}\n`);
};
