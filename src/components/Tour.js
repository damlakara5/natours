import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGetTourQuery } from '../store/getOneTour';
import OverviewBox from './OverviewBox';
import ReviewCard from './ReviewCard';
import { useUser } from '../context/userContext';

const Tour = () => {
    const { id } = useParams();
    const { data, } = useGetTourQuery(id)
    const {user} = useUser()

    const tour = data && data.data.data
    const date = tour?.startDates[0].toLocaleString('en-us', {month: 'long', year: 'numeric'})
    const paragraphs =  tour?.description.split('\n')

    return (
    <>
        <section class="section-header">
            <div class="header__hero">
                <div class="header__hero-overlay">&nbsp;</div>
                <img class="header__hero-img" src={`https://natours-e3yq.onrender.com/img/tours/${tour?.imageCover}`} alt={`${tour?.name}`} />
            </div>
            <div class="heading-box">
                <h1 class="heading-primary"><span> {tour?.name} </span></h1>
                <div class="heading-box__group">
                    <div class="heading-box__detail">
                    </div>
                    <div class="heading-box__detail">
                    </div>
                </div>
            </div>
        </section>
        <section class="section-description">
            <div class="overview-box">
                <div>
                    <div class="overview-box__group">
                        <h2 class="heading-secondary ma-bt-lg">Quick facts</h2>
                        <OverviewBox label="Next date" text={date} icon="calendar"  />
                        <OverviewBox label='Difficulty' text={tour?.difficulty} icon='trending-up'  />
                        <OverviewBox label='Participants' text={`${tour?.maxGroupSize} people`} icon='user'  />
                        <OverviewBox label='Rating' text={`${tour?.ratingsAverage} / 5`} icon="star"  />
                    </div>
                    <div class="overview-box__group">
                        <h2 class="heading-secondary ma-bt-lg">Your tour guides</h2>
                        {
                            tour?.guides.map(guide => (
                                <div class="overview-box__detail">
                                    <img class="overview-box__img" src={`https://natours-e3yq.onrender.com/img/users/${guide.photo}`} alt={`${guide.name}`} />
                                    <span class="overview-box__label"> {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"} </span>
                                    <span class="overview-box__text"> {guide.name} </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div class="description-box">
                <h2 class="heading-secondary ma-bt-lg">About {tour?.name}  tour</h2>
                {
                    paragraphs?.map(p => <p class="escription__text"> {p}</p>)
                }
            </div>
        </section>
        <section class="section-pictures">
            <div class="picture-box"><img class="picture-box__img picture-box__img--1" src="https://natours-e3yq.onrender.com/img/tours/tour-2-1.jpg" alt="The Park Camper Tour 1" /></div>
            <div class="picture-box"><img class="picture-box__img picture-box__img--2" src="https://natours-e3yq.onrender.com/img/tours/tour-2-2.jpg" alt="The Park Camper Tour 2" /></div>
            <div class="picture-box"><img class="picture-box__img picture-box__img--3" src="https://natours-e3yq.onrender.com/img/tours/tour-2-3.jpg" alt="The Park Camper Tour 3" /></div>
        </section>
        <section class="section-map">
            <div
                id="map"
                data-locations='[{"type":"Point","coordinates":[-80.128473,25.781842],"_id":"5c88fa8cf4afda39709c2959","description":"Lummus Park Beach","day":1},{"type":"Point","coordinates":[-80.647885,24.909047],"_id":"5c88fa8cf4afda39709c2958","description":"Islamorada","day":2},{"type":"Point","coordinates":[-81.0784,24.707496],"_id":"5c88fa8cf4afda39709c2957","description":"Sombrero Beach","day":3},{"type":"Point","coordinates":[-81.768719,24.552242],"_id":"5c88fa8cf4afda39709c2956","description":"West Key","day":5}]'
            ></div>
        </section>
        <section class="section-reviews">
            <div class="reviews">
                {
                    tour?.reviews.map(review => <ReviewCard  review={review} />)
                }
            </div>
        </section>
        <section class="section-cta">
            <div class="cta">
                <div class="cta__img cta__img--logo"><img src="https://natours-e3yq.onrender.com/img/logo-white.png" alt="Natours logo" /></div>
                <img class="cta__img cta__img--1" src="https://natours-e3yq.onrender.com/img/tours/tour-2-2.jpg" alt="Tour" />
                <img class="cta__img cta__img--2" src="https://natours-e3yq.onrender.com/img/tours/tour-2-3.jpg" alt="Tour" />
                <div class="cta__content">
                    <h2 class="heading-secondary">What are you waiting for?</h2>
                    <p class="cta__text">{tour?.duration} days. 1 adventure. Infinite memories. Make it yours today!</p>
                    {!user && <NavLink class="btn btn--green span-all-rows" to="/login">Log in to book tour</NavLink>}
                    {user && <button class="btn btn--green span-all-rows" >Book tour now!</button>}
                </div>
            </div>
        </section>
        </>
  )
}

export default Tour