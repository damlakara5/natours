import { NavLink } from "react-router-dom"

function NavItem({label, to, icon, active}) {
    return (
        <li className={active === label && "side-nav--active"} > 
            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" to={to} > {icon}  {label} </NavLink>
        </li>
    )
}

export default NavItem
