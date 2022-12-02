import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT: number = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT);
}
bootstrap().then(() => {
  console.log(`Server started on http://localhost:${PORT}`)
});
