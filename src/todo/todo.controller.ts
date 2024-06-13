import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { GraphInspector } from '@nestjs/core';

@Controller('todo')
export class TodoController {

    @Get()
    getTodos(){
        console.log("Récupérer la liste des todos");
        return 'Liste des Todos'
    }

    @Post()
    addTodo(){
        console.log("Ajouter un todo de la liste des todos");
        return 'Add Todo'
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