import React from 'react'
import {  useGetAllToursQuery } from '../store/allToursApi'
import TourCard from './TourCard'
import Loading from './Loading'

const AllTour = () => {
    const { data, error, isLoading } = useGetAllToursQuery()

    if(isLoading) return <Loading />

    return (
    <div className='card-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'>
         {
            data && data.data.data.map(tour => 
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
                />)
        } 
    </div>
  )
}

export default AllTour