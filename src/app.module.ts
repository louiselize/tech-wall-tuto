import { Logger, MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'
import { Todo } from './todo/entities/todo.entity';
import { CvModule } from './cv/cv.module';

dotenv.config();

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // /!\ mode dev ONLY : all modifications in ORM will be synchronized with DB
    }),
    CvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any{
    consumer.apply(FirstMiddleware).forRoutes(
      'hello',
      {
        path: 'todo', 
        method: RequestMethod.GET
      },
      {
        path: 'todo*',
        method: RequestMethod.DELETE
      }
    )

    .apply(logger).forRoutes('')
    .apply(HelmetMiddleware).forRoutes('')
  }
}
