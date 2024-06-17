import { Logger, MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [TodoModule],
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
        path: 'todo*',  //regular expression : all routes that start with 'todo'
        method: RequestMethod.DELETE
      }
    )

    .apply(logger).forRoutes('')
    .apply(HelmetMiddleware).forRoutes('')
  }
}
