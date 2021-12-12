import * as path from 'path';
import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
/*
const env = process.env.ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
    //do nothing
}
*/

const database = process.env.ENV == "dev" ? process.env.POSTGRES_DATABASE : process.env.POSTGRES_TEST_DATABASE


export const DatabaseConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRE_HOST,
    port: parseInt(<string>process.env.POSTGRE_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: database,   
    synchronize: false, //do not set it true in production
    connectTimeoutMS: 2000,   
    entities: ['dist/**/*.entity{.ts,.js}'],  

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: process.env.RUN_MIGRATIONS == 'true',
    logging: true,
    logger: 'file',

    // allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev
    migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
    cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default DatabaseConfig;
