import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions)
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next) => {
      console.log('Middleware from app.use')
      next()
    }
  )
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted : true,
  }));
  await app.listen(3000);
}
bootstrap();
