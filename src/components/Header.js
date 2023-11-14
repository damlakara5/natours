import { NavLink} from "react-router-dom"

import logo from "../assets/logo-white.png"
import { useUser } from "../context/userContext";
import { useEffect } from "react";
const Header = () => {
    const { user , setUser} = useUser();

    const logout = () => {
        localStorage.removeItem("userData")
        localStorage.removeItem("jwt")

        setUser(null);

        window.location ="/"
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
        <nav className="nav nav--user items-center me-4">
            {
                user && 
                <>
                    <NavLink className="nav__el nav__el--logout mb-0 " to="/favs"  >Favs</NavLink>
                    <NavLink className="nav__el nav__el--logout ms-2 mb-0" onClick={logout}>Logout</NavLink>
                    <NavLink className="nav__el ms-2" to="/me">
                        <img className="nav__user-img" src={`https://natours-e3yq.onrender.com/img/users/${user.photo}`} alt={user.name}/>
                        <span>{user.name} </span>
                    </NavLink>
                </>
            }
            {
                !user &&
                <>
                    <NavLink className="nav__el " to="/login">Login</NavLink>
                    <NavLink className="nav__el nav__el--cta" to="/signup">Sign Up</NavLink>
                </>
            }
        </nav>
    </header>
  )
}

export default Header