import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';


@Controller('todo')
export class TodoController {

    @Get()
    getTodos(
        @Req() request : Request,
        @Res() response : Response
    ){
        console.log(request)
        response.status(200);
        response.json({
            "content" : "hello world"
        });
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