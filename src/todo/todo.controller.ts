import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './DTO/get-paginated-todo.dto';
import { AddTodoDto } from './DTO/add-todo.dto';


@Controller('todo')
export class TodoController {
    constructor(){
        this.todos = []
    }

    todos: Todo[];

    @Get()
    getTodos(
        @Query() parameters: GetPaginatedTodoDto
    ){
        return this.todos
    }

    @Get('/:id')
    getTodoById(
        @Param('id') id
    ){
        const todo = this.todos.find((actualTodo) => actualTodo.id === +id);
        if(todo)
            return todo
        throw new NotFoundException('Todo not found')
    }

    @Post()
    addTodo(
        @Body() newTodo: AddTodoDto,
        @Body('id') id: string, // get only one argument
    ){
        const todo = new Todo();
        const {name,description} = newTodo;
        todo.name = name;
        todo.description = description;
        if (this.todos.length){
            todo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            todo.id = 1;
        }
        this.todos.push(todo)
        return newTodo
    }

    @Delete(':id') // ':' : get a parameter
    deleteTodo(
        @Param('id') id
    ){
        //Find todos inside todos array
        // '===' type taken into consideration
        // '+' transform str into int
        const index = this.todos.findIndex((todo) => todo.id === +id);

        //delete and return error if does not exist
        if (index >= 0){
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException(`Todo with id ${id} does not exist`)
        }
        return {
            message : `Todo with id ${id} has been succesfully deleted`,
            count: 1,
        }
    }

    @Put(':id')
    updateTodo(
        @Param('id') id,
        @Body() newTodo: Partial<AddTodoDto> // only a part of a todo
    ){
        const todo = this.getTodoById(id)
        todo.description = newTodo.description? newTodo.description : todo.description
        todo.name = newTodo.name? newTodo.name : todo.name
        return todo
    }
}