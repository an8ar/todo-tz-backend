import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./secrets/create-cert-key.pem'),
  cert: fs.readFileSync('./secrets/create-cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.use(cookieParser());
  app.use(helmet());
  //app.use(csurf());
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
