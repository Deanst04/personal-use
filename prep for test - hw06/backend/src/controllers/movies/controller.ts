import { NextFunction, Request, Response } from "express";
import Theater from "../../models/theater";
import Movie from "../../models/Movie";

export async function getByTheater(req: Request<{ theaterId: string }>, res: Response, next: NextFunction) {
    try {
        const { movies } = await Theater.findByPk(req.params.theaterId, {
            include: [Movie]
        })
        res.json(movies)
    } catch(e) {
        next(e)
    }
}

export async function addMovie(req: Request, res: Response, next: NextFunction) {
    try {
        const newMovie = await Movie.create(req.body)
        await newMovie.reload({ include: Theater })
        res.json(newMovie)
    } catch(e) {
        next(e)
    }
}

export async function removeMovie(req: Request<{ movieId: string }>, res: Response, next: NextFunction) {
    try {
        const { movieId } = req.params
        const deletedRows = await Movie.destroy({ where: {id: movieId } })
        if(deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ success: true })
    } catch(e) {
        next(e)
    }
}