import { NavLink } from "react-router-dom"
import { useUser } from "../context/userContext"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import UserReviewCard from "./UserReviewCard"

function MyReviews() {
    const {user} = useUser()
    const [reviews, setReviews] = useState()

    useEffect(() => {
        const handleReq = async() => {
            const res = await fetch(`https://natours-e3yq.onrender.com/api/v1/users/${user._id}/reviews`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            })
    
            const data = await res.json()
            setReviews(data.data.data)
        }
        handleReq()
    }, [user._id])


    return (
        <div>
            <main className="main py-20 md:px-16">
            <div className="user-view">
                <nav className="user-view__menu md:w-96 w-32">
                    <ul className="side-nav">
                        <li > 
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" href="#">Settings</NavLink>
                        </li>
                        <li>
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" href="/my-tours">My bookings</NavLink>
                        </li>
                        <li className="side-nav--active">
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" to="/myReviews">My reviews</NavLink>
                        </li>  
                        <li>
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start"  href="#">Billing </NavLink>
                        </li>
                    </ul>
                    {
                        user.role === 'admin' &&
                        <div clas="admin_nav">
                            <h5 className="admin-nav__heading">Admin</h5>
                            <ul className="side-nav">
                                    <li className="side-nav--active"> 
                                    <NavLink href="#">Manage tours</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/my-tours">Manage users</NavLink>
                                </li>
                                <li>
                                    <NavLink href="#">Manage reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink href="#">Manage bookings</NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                </nav>
                <div className="flex-1 grid grid-cols-2 gap-10 mx-6 my-5">
                    {
                        reviews?.map((review,i) => <UserReviewCard  key={i} review={review} />)
                    }
                </div>
            </div>
        </main>
        </div>
    )
}

export default MyReviews
