import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: 'asdf',
}));

// console.log(process.env.TEST);
