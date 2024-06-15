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

    @Put()
    updateTodo(){
        console.log("Modifier un todo la liste des todos");
        return 'Update Todo'
    }
}