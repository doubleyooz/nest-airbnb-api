import { registerAs } from '@nestjs/config';
export default registerAs('google', () => ({
    host: process.env.APP_HOST,
    id: process.env.GOOGLE_ID,
    secret: process.env.GOOGLE_SECRET,
}));
