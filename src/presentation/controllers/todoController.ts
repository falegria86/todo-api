import { Request, Response } from "express";

export class TodosController {
    public getTodos = async (req: Request, res: Response) => {
        return res.status(200).json({ message: 'its working' });
    }
}