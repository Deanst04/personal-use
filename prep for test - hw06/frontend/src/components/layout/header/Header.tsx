import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {

    return (
        <div className='Header'>
            <div>logo</div>
            <nav>
                {/* <a href="/profile">Profile</a> | <a href="/feed">Feed</a> */}
                <NavLink to="/books">Books</NavLink> | <NavLink to="/new-book">Add Book</NavLink>

            </nav>
            <div>
                books
            </div>
        </div>
    )
}