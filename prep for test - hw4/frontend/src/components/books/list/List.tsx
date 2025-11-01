import { useEffect, useState, type ChangeEvent } from 'react'
import './List.css'
import type { Genre } from '../../../models/Genre'
import genresServices from '../../../services/genres'
import booksServices from '../../../services/books'
import type { Book } from '../../../models/Book'

export default function List() {

    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenre, setSelectedGenre] = useState<string>('')
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        (async () => {
            try {
                const genres = await genresServices.getAll()
                setGenres(genres)
            } catch(e) {
                alert(e)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                if(selectedGenre) {
                    const books = await booksServices.getByGenreId(selectedGenre)
                    setBooks(books)
                }
            } catch(e) {
                alert(e)
            }
        })()
    }, [selectedGenre])

    function genreChanged(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedGenre(event.currentTarget.value)
    }

    async function removeBook(bookId: string) {
        try {
            await booksServices.removeBook(bookId)
            const booksAfterRemove = books.filter(b => b.id !== bookId)
            setBooks(booksAfterRemove)
        } catch(e) {
            alert(e)
        }
    }

    return (
        <div className="List">
            list of books:
            <div>
                <select onChange={genreChanged}>
                    <option value="" disabled selected>choose genre</option>
                    {genres.map(({id, name}) => <option key={id} value={id}>{name} <button onClick={() => removeBook}>remove</button></option>)}
                </select>
            </div>
            
            <ul>
                {books.map(({id, name}) => <li key={id} value={id}>{name}</li>)}
            </ul>
        </div>
    )
}