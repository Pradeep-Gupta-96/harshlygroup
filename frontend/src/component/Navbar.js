import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    let user = JSON.parse(localStorage.getItem('additem'))
    console.log(user)

    const onclick = () => {
        localStorage.clear()
    }
    
    return (
        <div className="main-menu">
            <ul className="menu-list">
                <li><a href="#">{user}</a>
                    <ul>
                        <li><Link to="/signup">
                            <button style={{ color: "#5c3502", cursor: "pointer" }} onClick={onclick}>Logout</button>
                        </Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Navbar