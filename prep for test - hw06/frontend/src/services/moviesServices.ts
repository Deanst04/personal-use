import axios from 'axios'
import type Movie from '../models/movie'
import type MovieDraft from '../models/movieDraft'

class MoviesServices {
    async getAllByTheater(theaterId: string): Promise<Movie[]> {
        const { data } = await axios.get<Movie[]>(`${import.meta.env.VITE_REST_SERVER_URL}/api/movies/by-theater/${theaterId}`)
        return data
    }

    async addMovie(draft: MovieDraft): Promise<Movie> {
        const { data } = await axios.post<Movie>(`${import.meta.env.VITE_REST_SERVER_URL}/api/movies`, draft)
        return data
    }

    async removeMovie(movieId: string): Promise<boolean> {
        const { data } = await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/api/movies/${movieId}`)
        return data
    }
}

const moviesServices = new MoviesServices()
export default moviesServices