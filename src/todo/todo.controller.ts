import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Todo } from './entities/todo.entity';


@Controller('todo')
export class TodoController {
    constructor(){
        this.todos = []
    }

    todos: Todo[];

    @Get()
    getTodos(){
        return this.todos
    }

     // ':' argument
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
        @Body() newTodo: Todo,
        @Body('id') id: string, // get only one argument
    ){
        if (this.todos.length){
            newTodo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            newTodo.id = 1;
        }
        this.todos.push(newTodo)
        return newTodo
    }

    @Delete()
    deleteTodo(){
        console.log("Supprimer un todo de la liste des todos");
        return 'Delete Todo'
    }

    @Put()
    updateTodo(){
        console.log("Modifier un todo la liste des todos");
        return 'Update Todo'
    }
}