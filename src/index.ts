import * as http from 'http';
import 'dotenv/config';

import { handler } from './utils/handler.js';

const PORT = process.env['SERVER_PORT'] || 3000;

export const server = http.createServer((req, res) => {
  handler.handleReq(req, res);
});

server.listen(PORT, () => {
  process.stdout.write(`🚀 Server ready on ${PORT}\n`);
});
