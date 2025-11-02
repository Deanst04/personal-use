import { NextFunction, Request, Response } from "express";
import Theater from "../../models/theater";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const allTheaters = await Theater.findAll()
        res.json(allTheaters)
    } catch(e) {
        next(e)
    }
} 