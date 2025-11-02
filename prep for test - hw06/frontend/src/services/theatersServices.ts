import axios from 'axios'
import type Theater from '../models/Theater'

class TheatersServices {
    async getAll(): Promise<Theater[]> {
        const { data } = await axios.get<Theater[]>(`${import.meta.env.VITE_REST_SERVER_URL}/api/theaters`)
        return data
    }
}

const theatersServices = new TheatersServices()
export default theatersServices