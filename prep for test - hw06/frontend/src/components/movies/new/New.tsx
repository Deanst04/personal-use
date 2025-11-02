import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './New.css'
import type Theater from '../../../models/Theater'
import { useNavigate } from 'react-router-dom'
import type MovieDraft from '../../../models/movieDraft'
import theatersServices from '../../../services/theatersServices'
import moviesServices from '../../../services/moviesServices'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'

export default function New() {

    const [theaters, setTheaters] = useState<Theater[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, reset, handleSubmit } = useForm<MovieDraft>()

    const navigate = useNavigate()

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

    async function submit(draft: MovieDraft) {
        try {
            setIsSubmitting(true)
            await moviesServices.addMovie(draft)
            alert('movie added successfully')
            reset()
            navigate('/movies')
        } catch(e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='New'>
            <form onSubmit={handleSubmit(submit)}>
                <select {...register('theaterId')}>
                    <option value="" selected disabled>choose theater</option>
                    {theaters.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
                <input placeholder='name' {...register('name')} />
                <input type="date" placeholder='date' {...register('showTime')} />
                <input type="number" placeholder='duration (in minutes)' {...register('duration')} />
                <SpinnerButton
                    buttonText='add movie'
                    loadingText='adding movie...'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    )
}