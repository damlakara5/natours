import { NavLink } from "react-router-dom"
import { useUser } from "../../context/userContext"
import NavItem from "./NavItem"
import {BsGear, BsHandbag, BsStar, BsCurrencyDollar} from "react-icons/bs"

function Sidebar({active}) {

    const {user} = useUser()

    return (
        <nav className="user-view__menu md:w-96 w-32">
                    <ul className="side-nav">
                        <NavItem active={active} to="/me" label="Settings" icon={<BsGear />}  />
                        <NavItem active={active} to="/my-bookings" label="My Bookings" icon={<BsHandbag />}  />
                        <NavItem active={active} to="/myReviews" label="My Reviews" icon={<BsStar/>}  />
                        <NavItem active={active} to="/billing" label="Billing" icon={<BsCurrencyDollar />}  />  
                    </ul>
                    {
                        user.role === 'admin' &&
                        <div clas="admin_nav">
                            <h5 className="admin-nav__heading">Admin</h5>
                            <ul className="side-nav">
                                <NavItem  label="Manage Tours" />
                                <NavItem  label="Manage Users" />
                                <NavItem  label="Manage Reviews" />
                                <NavItem  label="Manage Bookings" />
                            </ul>
                        </div>
                    }
                </nav>
    )
}

export default Sidebar
