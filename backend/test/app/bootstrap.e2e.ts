import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

export async function bootstrapTest(): Promise<INestApplication> {
    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
        controllers: [AppController],
        providers: [AppService],
    }).compile();
    return moduleFixture.createNestApplication();
}
