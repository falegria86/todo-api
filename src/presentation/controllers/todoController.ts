import { Request, Response } from "express";
import { Pool } from "pg";
import { envs } from "../../config/envs";

export class TodosController {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: envs.HOST
        });
    }

    public getTodos = async (req: Request, res: Response) => {
        try {
            const result = await this.pool.query('SELECT * FROM todos');
            const todos = result.rows;

            return res.status(200).json(todos);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error getting todos', error });
        }
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const result = await this.pool.query('SELECT * FROM todos WHERE id = $1', [id]);
            const todo = result.rows[0];

            return res.status(200).json(todo);
        } catch (error) {
            return res.status(500).json({ message: `Todo with id ${id} not found`, error });
        }
    }

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        try {
            await this.pool.query('INSERT INTO todos (text) VALUES ($1)', [text]);
            return res.status(200).json({ message: `Todo created correctly`, text })
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { text } = req.body;

        if (!text) return res.status(400).json({ error: 'Text is required' });

        try {
            await this.pool.query('UPDATE todos SET text = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [text, id]);

            return res.status(200).json({ message: `Todo with id ${id} updated correctly` });
        } catch (error) {
            return res.status(500).json({ message: `Todo with id ${id} not found`, error });
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const result = await this.pool.query('DELETE FROM todos WHERE id = $1', [id]);
            if (!result) return res.status(500).json({ message: `Todo with id ${id} not found` });
            else return res.status(200).json({ message: `Todo with id ${id} deleted successfully` });
        } catch (error) {
            return res.status(500).json({ message: `Todo with id ${id} not found`, error });
        }
    }
}