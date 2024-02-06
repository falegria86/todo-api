import { Router } from "express";
import { TodosController } from "./controllers/todoController";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        router.get('/api/todos', todoController.getTodos);
        router.get('/api/todos/:id', todoController.getTodoById);
        router.put('/api/todos/:id', todoController.updateTodo);
        router.post('/api/todos', todoController.createTodo);
        router.delete('/api/todos/:id', todoController.deleteTodo);

        return router;
    }
}