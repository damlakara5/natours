import React from 'react'
import { NavLink } from 'react-router-dom'

const TourCard = ({name, id, imageCover, difficulty,duration, summary, startLocation, startDates, locations, maxGroupSize, price, ratingsAverage, slug, ratingsQuantity}) => {
  
    return (
        <div className='card'>
            <div className='card__header'>
                <div className='card__picture'>
                    <div className='card__picture-overlay'>
                        &nbsp;
                        <img className="card__picture-img" src={`https://natours-e3yq.onrender.com/img/tours/${imageCover}`} alt={name}/>
                    </div>
                    </div>
                    <h3 className="heading-tertirary"><span> {name} </span></h3>
                </div>
                <div className="card__details">
                    <h4 className="card__sub-heading">{`${difficulty} ${duration}-day tour`} </h4>
                    <p className="card__text"> {`${summary}`} </p>
                    <div className="card__data"><span> {`${startLocation.description}`} </span></div>
                    <div className="card__data"><span> {startDates[0].toLocaleString('en-us', {month: 'long', year: 'numeric'})} </span></div>
                    <div className="card__data"><span> {`${locations.length} stops`} </span></div>
                    <div className="card__data"><span> {`${maxGroupSize} people`} </span></div>
                </div>
                <div className="card__footer card__footer--grid">
                    <p><span className="card__footer-value"> {`$${price}`} </span> <span className="card__footer-text">per person</span></p>
                    <p className="card__ratings"><span className="card__footer-value"> {ratingsAverage} </span> <span className="card__footer-text">rating (${ratingsQuantity})</span></p>
                    <NavLink  to={`/tour/${id}`} className="btn btn--green btn--small" >Details</NavLink>
                </div>
           
        </div>
                    
                            

  )
}

export default TourCard