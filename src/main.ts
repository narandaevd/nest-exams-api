import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configation } from './utils/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  await app.listen(Configation.consts().PORT);
}
bootstrap();
