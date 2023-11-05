import React from 'react'
import {BsStarFill, BsStar} from "react-icons/bs"

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <span
    className={`star ${filled ? 'filled' : 'unfilled'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {filled ? <BsStarFill className="reviews__star reviews__star--active" /> :  <BsStar className="reviews__star" /> }
  </span>
  )
}

export default Star