import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {

    return (
        <div className='Header'>
            <div>logo</div>
            <nav>
                {/* <a href="/profile">Profile</a> | <a href="/feed">Feed</a> */}
                <NavLink to="/movies">Movies</NavLink> | <NavLink to="/new-movie">Add Movie</NavLink>

            </nav>
            <div>
                Movies
            </div>
        </div>
    )
}