import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './DTO/get-paginated-todo.dto';
import { AddTodoDto } from './DTO/add-todo.dto';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ){}



    @Get()
    getTodos(
        @Query() parameters: GetPaginatedTodoDto
    ){
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
    ){
        return this.todoService.addTodo(newTodo)
    }

    @Delete(':id') 
    deleteTodo(
        @Param('id', ParseIntPipe) id
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
}