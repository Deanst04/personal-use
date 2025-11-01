import axios from "axios"
import type { Genre } from "../models/Genre"

class GenresService {
    async getAll(): Promise<Genre[]> {
        const { data } = await axios.get<Genre[]>(`${import.meta.env.VITE_REST_SERVER_URL}/genres`)
        return data
    }
} 

const genresServices = new GenresService()
export default genresServices