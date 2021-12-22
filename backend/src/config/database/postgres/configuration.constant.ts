import { registerAs } from '@nestjs/config';
export default registerAs('db', () => ({
    type: process.env.DATABASE_TYPE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USER,
    password: process.env.TYPEORM_PASSWORD,
    name:
        process.env.NODE_ENV == 'development'
            ? process.env.TYPEORM_NAME
            : process.env.TYPEORM_TEST_NAME,
}));
