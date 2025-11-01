import { Router } from "express";
import { addBook, getBooksByGenres, removeBook } from "../controllers/books/controller";
import validation from "../middlewares/validation";
import { booksByAudienceIdValidator, newBookValidator } from "../controllers/books/validator";
import paramValidation from "../middlewares/param-validation";

const router = Router()

router.get('/by-genre/:id', paramValidation(booksByAudienceIdValidator) ,getBooksByGenres)
router.post('/', validation(newBookValidator), addBook)
router.delete('/:id', paramValidation(booksByAudienceIdValidator), removeBook)

export default router