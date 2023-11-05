import { NavLink, useNavigate,} from "react-router-dom"

import logo from "../assets/logo-white.png"
import { useUser } from "../context/userContext";
import { useEffect } from "react";
const Header = () => {
    const { user , setUser} = useUser();
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("userData")
        localStorage.removeItem("jwt")

        setUser(null);

        navigate("/login")
    }

    useEffect(() => {}, [user])


  return (
    <header className="header md:px-12 ">
        <nav className="nav nav--tours">
            <a className="nav__el md:text-base text-sm" href="/">All Tours</a>
        </nav>
        <div className="header__logo">
            <img src={logo} alt="Natours logo"/>
        </div>
        <nav className="nav nav--user me-4">
            {
                user && 
                <>
                    <NavLink className="nav__el nav__el--logout" onClick={logout}>Logout</NavLink>
                    <NavLink className="nav__el" to="/me">
                        <img className="nav__user-img" src={`https://natours-e3yq.onrender.com/img/users/${user.photo}`} alt={user.name}/>
                        <span>{user.name} </span>
                    </NavLink>
                </>
            }
            {
                !user &&
                <>
                    <NavLink className="nav__el" to="/login">Login</NavLink>
                    <NavLink className="nav__el nav__el--cta">Sign Up</NavLink>
                </>
            }
        </nav>
    </header>
  )
}

export default Header