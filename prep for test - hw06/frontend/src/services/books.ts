import axios from "axios"
import type { Book } from "../models/Book"
import type { BookDraft } from "../models/Book-draft"

class BooksService {
    async getByGenreId(genreId: string): Promise<Book[]> {
        const { data } = await axios.get<Book[]>(`${import.meta.env.VITE_REST_SERVER_URL}/books/by-genre/${genreId}`)
        return data
    }

    async newBook(draft: BookDraft): Promise<Book> {
        const { data } = await axios.post<Book>(`${import.meta.env.VITE_REST_SERVER_URL}/books`, draft)
        return data
    }

    async removeBook(bookId: string): Promise<boolean> {
        const { data } = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/books/${bookId}`)
        return data
    }
}

const booksServices = new BooksService()
export default booksServices