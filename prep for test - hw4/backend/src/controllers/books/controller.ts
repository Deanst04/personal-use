import { NextFunction, Request, Response } from "express";
import Genres from "../../models/genres";
import Books from "../../models/books";

export async function getBooksByGenres(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { books } = await Genres.findByPk(req.params.id, {
            include: [Books]
        })
        res.json(books)
    } catch(e) {
        next(e)
    }
}

export async function addBook(req: Request, res: Response, next: NextFunction) {
    try {
        const newBook = await Books.create(req.body)
        await newBook.reload({ include: Genres })
        res.json(newBook)
    } catch(e) {
        next(e)
    }
}

export async function removeBook(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const deletedRows = await Books.destroy({ where: { id } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ message: "success" })
    } catch(e) {
        next(e)
    }
}