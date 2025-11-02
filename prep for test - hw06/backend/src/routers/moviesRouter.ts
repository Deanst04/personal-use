import { Router } from "express";
import { addMovie, getByTheater, removeMovie } from "../controllers/movies/controller";
import validation from "../middlewares/validation";
import { idValidator, newMovieValidator } from "../controllers/movies/validator";

const router = Router()

router.get('/by-theater/:theaterId', validation(idValidator("theaterId"), "params") ,getByTheater)
router.post('/', validation(newMovieValidator, "body") ,addMovie)
router.delete('/:movieId', validation(idValidator("movieId"), "params") ,removeMovie)

export default router