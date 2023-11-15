import React, {  useEffect, useState } from 'react'
import TourCard from './TourCard'
import Loading from './Loading'
import { useGetTour } from '../hooks/useGetTour'
import { toast } from 'react-toastify'

const AllTour = () => {


  const [location, setLocation] = useState({
      latitude: null,
      longitude: null,
      error: null,
    });
  const [distance, setDistance] = useState()
  const [unit, setUnit] = useState()
  const [show, setShow] = useState("all")
  const {tours,allToursLoading, getTopFiveTours, topFiveTour, topFiveIsLoading, getToursWithin, toursWithin} = useGetTour()
  

    useEffect(() => {
        if (!navigator.geolocation) {
          setLocation((prevState) => ({
            ...prevState,
            error: 'Geolocation is not supported by your browser.',
          }));
        } else {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        }
        if(toursWithin){
          setShow("toursWithin")
        }
      }, [toursWithin]);

 
    const handleSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          error: null,
        });


      };
    
      const handleError = (error) => {
        setLocation({
          latitude: null,
          longitude: null,
          error: error.message,
        });
      };

 
    const handleGetToursWithin = () => {
      if(location.error === "User denied Geolocation"){
        toast.error("You have to give  location permisson!")
      }
      if(location.latitude || location.latitude){
        getToursWithin({
          distance,
          location: `${location.latitude},${location.longitude}`,
          unit
        })
      }
      setUnit("")
      setDistance("")
    }

    
    
    const handleTopFiveClick = () => {
      getTopFiveTours()
      setShow("topFive")
    }
       
    if(allToursLoading || topFiveIsLoading) return <Loading />
    return (
        <div className='px-5'>
            <div className='sm:flex gap-4 mt-5 text-3xl items-center '>
                <div className='text-2xl flex sm:flex-row flex-col gap-3 items-center '>
                    <p >Get Tours Within</p>
                    <input placeholder='Distance' value={distance} onChange={(e)=> setDistance(e.target.value)} className='border rounded-md px-2 outline-none' />
                    <input placeholder='mi/km' value={unit} onChange={(e)=> setUnit(e.target.value)} className='border rounded-md px-2 max-w-min outline-none' />
                    <button className='border px-4 py-1 rounded-md bg-slate-200' onClick={handleGetToursWithin}>Get</button>
                </div>
                <div className='flex sm:mt-0 mt-5 justify-between sm:ml-auto sm:gap-5'>
                 <button className={`sm:ml-auto hover:text-[22px]  ${show === "all" && "border-b-2 border-green-600"}`} onClick={() => setShow("all")}>All</button>
                 <button className={`hover:text-[20px] sm:ms-0 ms-5 ${show === "topFive" && "border-b-2 border-green-600"}`} onClick={handleTopFiveClick}>5 TOP CHEAP</button>
                </div>
           </div>
            {
                    toursWithin && toursWithin.results === 0 && <p className='text-4xl text-start mt-6'>There is no tour within {distance} {unit || "mi"} </p>
              } 
            <div className='card-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'>
             
            {
               tours && show === "all" && tours.map(tour => 
                  <TourCard  
                      id={tour.id}
                      name={tour.name} 
                      difficulty={tour.difficulty}
                      duration={tour.duration}
                      imageCover={tour.imageCover}
                      locations={tour.locations}
                      maxGroupSize={tour.maxGroupSize}
                      price={tour.price}
                      isFav={tour.isFav}
                      isBooked={tour.isBooked}
                      ratingsAverage={tour.ratingsAverage}
                      ratingsQuantity={tour.ratingsQuantity}
                      slug={tour.slug}
                      startDates={tour.startDates}
                      startLocation={tour.startLocation}
                      summary={tour.summary}
                      key={tour.name}
                  /> )
              }  
              {
                topFiveTour && show=== "topFive" && topFiveTour.data.data.map(tour => 
                  <TourCard  
                  id={tour.id}
                  name={tour.name} 
                  difficulty={tour.difficulty}
                  duration={tour.duration}
                  imageCover={tour.imageCover}
                  locations={tour.locations}
                  maxGroupSize={tour.maxGroupSize}
                  price={tour.price}
                  isFav={tour.isFav}
                  isBooked={tour.isBooked}
                  ratingsAverage={tour.ratingsAverage}
                  ratingsQuantity={tour.ratingsQuantity}
                  slug={tour.slug}
                  startDates={tour.startDates}
                  startLocation={tour.startLocation}
                  summary={tour.summary}
                  key={tour.name}
              /> )
                  
              }
                {
                  toursWithin && show==="toursWithin" && toursWithin.data.data.map(tour => 
                    <TourCard  
                    id={tour.id}
                    name={tour.name} 
                    difficulty={tour.difficulty}
                    duration={tour.duration}
                    imageCover={tour.imageCover}
                    locations={tour.locations}
                    maxGroupSize={tour.maxGroupSize}
                    price={tour.price}
                    isFav={tour.isFav}
                    isBooked={tour.isBooked}
                    ratingsAverage={tour.ratingsAverage}
                    ratingsQuantity={tour.ratingsQuantity}
                    slug={tour.slug}
                    startDates={tour.startDates}
                    startLocation={tour.startLocation}
                    summary={tour.summary}
                    key={tour.name}
                /> )
                }
            </div>
        </div>
    
  )
}

export default AllTour