import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './DTO/get-paginated-todo.dto';
import { AddTodoDto } from './DTO/add-todo.dto';
import { TodoService } from './todo.service';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion/upper-and-fusion.pipe';
import { DurationInterceptor } from 'src/interceptors/duration/duration.interceptor';


// @UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ){}

    @Get()
    getTodos(
        @Query() parameters: GetPaginatedTodoDto
    ): Todo[]{
        return this.todoService.getTodos()
    }

    @Get('/:id')
    getTodoById(
        @Param('id', ParseIntPipe) id
    ){
        return this.todoService.getTodoById(id);
    }

    @Post()
    addTodo(
        @Body() newTodo: AddTodoDto,
    ): Todo{
        return this.todoService.addTodo(newTodo)
    }

    @Delete(':id') 
    deleteTodo(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_FOUND})) id
    ){
        return this.todoService.deleteTodo(id);
    }

    @Put(':id')
    updateTodo(
        @Param('id', ParseIntPipe) id,
        @Body() newTodo: Partial<AddTodoDto>
    ){
        return this.todoService.updateTodo(id, newTodo)
    }

    @Post('pipe')
    testPipe(
        @Param('data', UpperAndFusionPipe) param,
        @Body() data
    ) {
        return data
    }
}