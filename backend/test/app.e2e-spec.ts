import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { bootstrapTest } from './app/bootstrap.e2e';

describe('AppController (e2e)', () => {
    let app: INestApplication;    
  

    beforeAll(async () => {
      app = await bootstrapTest();  
    
      await app.init();
    }); 
    

    afterAll(async () => {
        await app.close();
    });

    describe('GET /', () => {
        it('should return hello world', async () => {
            const response = await request.default(app.getHttpServer())
                .get('/')
                .expect(200);
            expect(response.text).toEqual('Hello World!');
        });
    });
});
