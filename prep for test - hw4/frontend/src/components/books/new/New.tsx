import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './New.css'
import type { Genre } from '../../../models/Genre'
import type { BookDraft } from '../../../models/Book-draft'
import { useNavigate } from 'react-router-dom'
import genresServices from '../../../services/genres'
import booksServices from '../../../services/books'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'

export default function New() {

    const [genres, setGenres] = useState<Genre[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, reset, handleSubmit } = useForm<BookDraft>()

    const navigate = useNavigate()

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

    async function submit(draft: BookDraft) {
        try {
            setIsSubmitting(true)
            await booksServices.newBook(draft)
            alert('new book added successfully')
            reset()
            navigate(`/books`)
        } catch(e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='New'>
            <form onSubmit={handleSubmit(submit)}>
                <select {...register('genreId')}>
                    <option value="" selected disabled>choose genre</option>
                    {genres.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
                </select>
                <input placeholder='name' {...register('name')} />
                <input placeholder='description' {...register('description')} />
                <input placeholder='price' step="any" type='number' {...register('price')} />
                <input placeholder='stock' type='number' {...register('stock')} />
                <SpinnerButton
                    buttonText='add book'
                    loadingText='adding new book...'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    )
}