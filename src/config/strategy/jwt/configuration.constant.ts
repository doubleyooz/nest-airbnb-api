import { registerAs } from '@nestjs/config';
export default registerAs('jwt', () => ({
    sign_in: process.env.JWT_SIGNIN,
    expiration: process.env.JWT_EXPIRATION
   
}));
