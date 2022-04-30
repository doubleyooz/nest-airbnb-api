import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST, // localhost
    port: parseInt(process.env.TYPEORM_PORT), // 5432
    username: process.env.TYPEORM_USER, // databse login role username
    password: process.env.TYPEORM_PASSWORD, // database login role password
    database:
        process.env.NODE_ENV == 'development'
            ? process.env.TYPEORM_NAME
            : process.env.TYPEORM_TEST_NAME, // db name

    entities: ['{src, dist}/models/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    logger: 'file',

    migrations: ['dist/database/migrations/*.js'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },

    connectTimeoutMS: 2000,
};

export = config;
