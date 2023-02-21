import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import * as process from 'process';
export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

console.log(process.env.TEST);
