import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';

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
  app.useGlobalInterceptors(new DurationInterceptor()); // should be instantiated because app not ready yet
  await app.listen(3000);
}
bootstrap();
