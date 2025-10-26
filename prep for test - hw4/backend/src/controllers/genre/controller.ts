import { NextFunction, Request, Response } from "express";
import Genres from "../../models/genres";

export async function getGenres(req: Request, res: Response, next: NextFunction) {
    try {
        const genres = await Genres.findAll()
        res.json(genres)
    } catch (e) {
        next(e)
    }
}