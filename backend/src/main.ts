import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfig: AppConfigService = app.get(AppConfigService);    
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(appConfig.port);
}
bootstrap();
