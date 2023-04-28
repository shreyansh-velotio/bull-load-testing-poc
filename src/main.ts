import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { APP_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
}
bootstrap();
