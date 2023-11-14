import TourCard from "./TourCard"
import { useGetBookings} from "../hooks/useGetBookings"
import Loading from "./Loading"
import Sidebar from "./ui/Sidebar"
import Main from "./ui/Main"
function MyBookings() {

    const {bookings, bookingsIsLoading} = useGetBookings()

    if(bookingsIsLoading) return <Loading />


    return (
        <Main >
            <Sidebar active="My Bookings" />
            <div className='card-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 ps-6'>
            {
                bookings && bookings.tours.map(tour => 
                    <TourCard
                    id={tour.id}
                    name={tour.name} 
                    difficulty={tour.difficulty}
                    duration={tour.duration}
                    imageCover={tour.imageCover}
                    locations={tour.locations}
                    maxGroupSize={tour.maxGroupSize}
                    price={tour.price}
                    ratingsAverage={tour.ratingsAverage}
                    ratingsQuantity={tour.ratingsQuantity}
                    slug={tour.slug}
                    startDates={tour.startDates}
                    startLocation={tour.startLocation}
                    summary={tour.summary}
                    key={tour.name}
                />
                )
            }
        </div>
        </Main>
        
      )
}

export default MyBookings
