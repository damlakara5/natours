import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import OverviewBox from './OverviewBox';
import ReviewCard from './ReviewCard';
import { useUser } from '../context/userContext';
import Map from './Map';
import { useTour} from "../hooks/useTour"
import { useBookTour} from "../hooks/useBookTour"
import Star from "./Star"
import { toast } from 'react-toastify';
import {useReviews} from "../hooks/useReviews"

const Tour = () => {
    const { id } = useParams();
    const { tour, date, paragraphs, isBooked } = useTour(id)
    const {bookTour} = useBookTour()
    const {user} = useUser()
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState();
    const {  createReview} = useReviews(id)




    const handleCreateReview = () => {
        if(!review || !rating){
            toast.error("Please fill the necessary fields!")
        }else{
            createReview({ id: tour.id, reqData: { review, rating } });

        }
        
    }



    return (
    <>
        <section className="section-header">
            <div className="header__hero">
                <div className="header__hero-overlay">&nbsp;</div>
                <img className="header__hero-img" src={`https://natours-e3yq.onrender.com/img/tours/${tour?.imageCover}`} alt={`${tour?.name}`} />
            </div>
            <div className="heading-box">
                <h1 className="heading-primary"><span> {tour?.name} </span></h1>
                <div className="heading-box__group">
                    <div className="heading-box__detail">
                    </div>
                    <div className="heading-box__detail">
                    </div>
                </div>
            </div>
        </section>
        <section className="section-description">
            <div className="overview-box">
                <div>
                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                        <OverviewBox label="Next date" text={date} icon="calendar"  />
                        <OverviewBox label='Difficulty' text={tour?.difficulty} icon='trending-up'  />
                        <OverviewBox label='Participants' text={`${tour?.maxGroupSize} people`} icon='user'  />
                        <OverviewBox label='Rating' text={`${tour?.ratingsAverage} / 5`} icon="star"  />
                    </div>
                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                        {
                            tour?.guides.map(guide => (
                                <div className="overview-box__detail">
                                    <img className="overview-box__img" src={`https://natours-e3yq.onrender.com/img/users/${guide.photo}`} alt={`${guide.name}`} />
                                    <span className="overview-box__label"> {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"} </span>
                                    <span className="overview-box__text"> {guide.name} </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="description-box">
                <h2 className="heading-secondary ma-bt-lg">About {tour?.name}  tour</h2>
                {
                    paragraphs?.map(p => <p className="description__text"> {p}</p>)
                }
            </div>
        </section>
        <section className="section-pictures">
            <div className="picture-box"><img className="picture-box__img picture-box__img--1" src="https://natours-e3yq.onrender.com/img/tours/tour-2-1.jpg" alt="The Park Camper Tour 1" /></div>
            <div className="picture-box"><img className="picture-box__img picture-box__img--2" src="https://natours-e3yq.onrender.com/img/tours/tour-2-2.jpg" alt="The Park Camper Tour 2" /></div>
            <div className="picture-box"><img className="picture-box__img picture-box__img--3" src="https://natours-e3yq.onrender.com/img/tours/tour-2-3.jpg" alt="The Park Camper Tour 3" /></div>
        </section>
        <section className="section-map">
            <Map  location={tour?.locations} />
         </section>
        <section className="section-reviews">
            <div className="reviews">
                {
                    tour?.reviews.map(review => <ReviewCard  review={review} />)
                }
            </div>
        </section>
          <section className="section-cta">
            <div className="cta">
                <div className="cta__img cta__img--logo"><img src="https://natours-e3yq.onrender.com/img/logo-white.png" alt="Natours logo" /></div>
                <img className="cta__img cta__img--1" src="https://natours-e3yq.onrender.com/img/tours/tour-2-2.jpg" alt="Tour" />
                <img className="cta__img cta__img--2" src="https://natours-e3yq.onrender.com/img/tours/tour-2-3.jpg" alt="Tour" />
                { !isBooked && <div className="cta__content">
                    <h2 className="heading-secondary">What are you waiting for?</h2>
                    <p className="cta__text">{tour?.duration} days. 1 adventure. Infinite memories. Make it yours today!</p>
                    {!user && <NavLink className="btn btn--green span-all-rows" to="/login">Log in to book tour</NavLink>}
                    {user && <button className="btn btn--green span-all-rows" onClick={() => bookTour(tour.id)} >Book tour now!</button>}
                </div>}
                {
                    isBooked &&
                    <>
                        <h2 className="heading-secondary ma-bt-lg"> Add a Review</h2>
                        <div className='text-3xl flex items-start justify-center flex-col'>
                            <label >Your Review </label>
                            <textarea value={review}  onChange={(e) =>setReview(e.target.value)}  placeholder='Add Your Review' className='border-2 outline-none p-4 my-2 rounded-md w-1/2' /> 
                        </div>
                        <p className='text-4xl text-start mt-5 mb-2'>How would you rate your experience?</p>

                        <div className="reviews__rating flex items-start mt-3" role='button'> 
                            {
                                    [1,2,3,4,5].map((item) =>
                                    <Star
                                    key={item}
                                    filled={item < (hover || rating)}
                                    onMouseEnter={() => setHover(item + 1)}
                                    onMouseLeave={() => setHover(rating)}
                                    onClick={() => setRating(item + 1)}
                                    />
                                )
                                }
                                
                            
                        </div>
                        <button onClick={handleCreateReview} className='btn btn--green btn--small mt-12'>Add</button>
                    </>
                }
            </div>
        </section>
        
        </>
  )
}

export default Tour