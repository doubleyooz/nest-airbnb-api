/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/prefer-module */
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import path from "path";
import { TypeOrmConfigService } from "../config/database/postgres/configuration.service";
import {DatabaseType} from "typeorm";
import {BaseConnectionOptions} from "typeorm/connection/BaseConnectionOptions";

export class TypeOrmConfigurationProvider {
    constructor(private readonly configService: TypeOrmConfigService){}
    /**
     * This method uses process.env directly because it is also used in a node script that doesn't have access
     * to NestJS injection.
     * @returns
     */
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        console.log("DIRNAME", __dirname);
        const nodeModuleCorePath = path.join(
            __dirname,
            "",
            "**",
            "*.entity.{ts,js}"
        );
        console.log("Using core entity path:", nodeModuleCorePath);

        const appModulePath = path.join(
            __dirname,
            "",
            "**",
            "*.entity.{ts,js}"
        );
        console.log("Using application entity path:", appModulePath);

        const migrationsPath = path.join(
            __dirname,
            "",
            "**",
            "migrations",
            "*.{ts,js}"
        );
        console.log("Using migration path:", migrationsPath);
        /*
        if (this.configService.hasOwnProperty('url')) {
            return {
                type:
                    (this.configService.type as DatabaseType) ||
                    "postgres",
                url: this.configService.url,
                logging: false,
                migrationsTableName: "migrations",
                migrationsRun: true,
                synchronize: false,
                entities: [nodeModuleCorePath, appModulePath],
                migrations: [migrationsPath],
                cli: {
                    migrationsDir: "src/migrations",
                },
            };
        }*/
        // if passing in the pg env vars this is a pg db!
        return {
            type: (this.configService.type as DatabaseType) || "postgres",
            host: this.configService.host,
            port: this.configService.port,
            username: this.configService.username,
            password: this.configService.password,
            database: this.configService.name,
            //schema: process.env.APP_POSTGRES_SCHEMA,
            migrationsTableName: "migrations",
            migrationsRun: true,
            logger: 'file',
            logging: true,
            synchronize: false,
            entities: [nodeModuleCorePath, appModulePath],
            migrations: [migrationsPath],
            cli: {
                migrationsDir: "src/migrations",
            },
        } as BaseConnectionOptions; // this is dynamic based on the type discriminator
    }
}