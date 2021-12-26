import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppModule } from '../../src/app.module';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

import TypeOrmConfig from '../../src/config/configurations/typeorm.config';
import { TypeOrmConfigModule } from '../../src/config/database/postgres/configuration.module';
import { TypeOrmConfigService } from '../../src/config/database/postgres/configuration.service';



export async function bootstrapTest(): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [    
        AppModule,    
        TypeOrmModule.forRootAsync({
            imports: [TypeOrmConfigModule],
            useFactory: async (
                configService: TypeOrmConfigService,
            ): Promise<TypeOrmModuleOptions> =>
                TypeOrmConfig.getOrmConfig(configService),
            inject: [TypeOrmConfigService],
        }),
    ],  
    controllers: [AppController],
    providers: [AppService],
  }).compile();
  console.log("compiled") 
  return moduleFixture.createNestApplication();
}