import { NavLink } from "react-router-dom"
import { useGetBookings } from "../hooks/useGetBookings"
import Loading from "./Loading"
import { BsCalendar2Date } from "react-icons/bs";
import Sidebar from "./ui/Sidebar"
import Main from "./ui/Main"

function Billing() {
    
    const {bookings, bookingsIsLoading} = useGetBookings()

    if(bookingsIsLoading) return <Loading />

    const totalPrice = bookings?.tours.reduce((accumulator, tour) => accumulator + tour.price, 0);

    // Options for toLocaleString to display the date in the desired format
    const options = { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
    };

    return (
        <Main>
                <Sidebar  active="Billing" />
                <div className="w-full mx-6 my-5 mt-16">
                    <ul>
                        {
                            bookings?.tours.map(tour => (
                                <li className="sm:text-4xl text-xl flex flex-col mb-24 px-6 shadow-lg rounded-md hover:shadow-xl  "> 
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-5">
                                                <img className="rounded-full sm:w-24 sm:h-24 w-12 h-12"  src={`https://natours-e3yq.onrender.com/img/tours/${tour.images[0]}`} alt="Tour" />
                                                <p>{tour.name}</p>
                                            </div>
                                            <p className="flex sm:text-2xl text-lg items-center mt-5 gap-4"> <BsCalendar2Date className="reviews__star reviews__star--active " /> { new Date(tour.createdAt).toLocaleString('en-US', options).replace(',', '').replace(/:\d+ /, '.')} </p>
                                        </div>
                                        <p className=""> {tour.price}$ </p>

                   {/*                      <div className="flex flex-col items-end">
                                            <p className="flex items-top text-3xl ">  <BsStarFill className="reviews__star reviews__star--active me-3" /> {tour.ratingsAverage}</p>

                                        </div> */}
                                        
                                    </div>
                                   <div className="flex justify-end mt-5">
                                    
                                   </div>
                                   
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex justify-between text-start sm:text-4xl text-2xl pt-5 mt-14 font-semibold">
                        <p>TOTAL EXPENDITURE</p>
                        <p> {totalPrice} $ </p>
                    </div>
                    <p className="text-start text-xl mt-44">
                        *Please be advised that, in accordance with our company policy, refunds cannot be issued for purchased tours. We strongly encourage you to review all details of your chosen tour thoroughly before finalizing your purchase. In the case of emergencies or unforeseen circumstances, options for modifications are available under the conditions outlined in our sales agreement. Customer satisfaction is of utmost importance to us; should you have any questions or concerns, do not hesitate to contact our customer service team.
                    </p>
                    <NavLink to="/allTours" className='btn btn--green btn--small mt-12'>Book Another Tour</NavLink>
                </div>
        </Main>
    )
}

export default Billing
