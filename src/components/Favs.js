import { useFavs } from "../hooks/useFavs"
import Loading from "./Loading"
import TourCard from "./TourCard"

function Favs() {

    const {favs, favIsLoading} = useFavs()

    if(favIsLoading) return <Loading />

    if(favs?.data.tours.length === 0) return <div className="text-4xl text-start mt-40">You don't have any favorite tours yet! ☹️ <br /> Check out our tours and add them to your favorites now!</div>

    const isFavorited = (tourId) => {
        return favs.data.tours.some(favorite => favorite.id === tourId);
      };
     
   
    return (
        <div className='card-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 px-5'>
            {
                favs && favs.data.tours.map(tour => 
                    <TourCard
                    id={tour.id}
                    name={tour.name} 
                    difficulty={tour.difficulty}
                    duration={tour.duration}
                    imageCover={tour.imageCover}
                    locations={tour.locations}
                    maxGroupSize={tour.maxGroupSize}
                    price={tour.price}
                    isFav = {isFavorited(tour.id)}
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
    )
}

export default Favs
