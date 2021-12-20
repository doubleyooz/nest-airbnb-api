import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig: AppConfigService = app.get('AppConfigService');

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(appConfig.port);
}
bootstrap();
