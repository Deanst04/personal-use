import { useEffect, useState, type ChangeEvent } from 'react'
import './List.css'
import type Theater from '../../../models/Theater'
import type Movie from '../../../models/movie'
import theatersServices from '../../../services/theatersServices'
import moviesServices from '../../../services/moviesServices'

export default function List() {

    const [theaters, setTheaters] = useState<Theater[]>([])
    const [selectedTheater, setSelectedTheater] = useState<string>('')
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        (async () => {
            try {
                const allTheaters = await theatersServices.getAll()
                setTheaters(allTheaters)
            } catch(e) {
                alert(e)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                if(selectedTheater) {
                    const moviesByTheater = await moviesServices.getAllByTheater(selectedTheater)
                    setMovies(moviesByTheater)
                }
            } catch(e) {
                alert(e)
            }
        })()
    }, [selectedTheater])

    function theaterChanged(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedTheater(event.currentTarget.value)
    }

    async function removeMovie(movieId: string) {
        try {
            await moviesServices.removeMovie(movieId)
            const moviesAfterRemove = movies.filter(m => m.id !== movieId)
            setMovies(moviesAfterRemove)
            alert('movie removed successfully')
        } catch(e) {
            alert(e)
        }
    }

    return (
        <div className="List">
            <div>
                <select onChange={theaterChanged}>
                    <option value="" selected disabled>choose theater</option>
                    {theaters.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
            </div>

            <div>
                <ul>
                    {movies.map(({ id, name }) => <li key={id}>{name} <button onClick={() => removeMovie(id)}>remove movie</button></li>)}
                </ul>
            </div>
        </div>
    )
}