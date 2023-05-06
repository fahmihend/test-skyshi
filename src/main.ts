import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './helper/config.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = Config.get('APP_PORT') || 3030;
  await app.listen(PORT, () => Logger.log(`App run on PORT : ${PORT}`));
}
bootstrap();
