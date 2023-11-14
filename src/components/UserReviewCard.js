import {BsStarFill, BsStar, BsPencilSquare, BsFillTrash3Fill} from "react-icons/bs"
import Loading from "./Loading"
import React, {  useState } from 'react'
import Star from "./Star"
import { useReviews } from "../hooks/useReviews"

function UserReviewCard({review}) {

    const [isEditing , setIsEditing] = useState(false)
    const [editedReview, setEditedReview] = useState(review.review)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0);
    const {editReview, deleteReview} = useReviews(review.id)
    

    if(!review) return <Loading ></Loading>

    const handleReviewDelete = async() => {
        deleteReview({id: review.id})
        
    }

    const handleEditReview = async() => {
        const reqData = {
            rating,
            review: editedReview
        }
        setIsEditing(cur => !cur)
        editReview({ id: review.id, reqData });
    }
  
    


    return (
        <div className='relative rounded-md'>
            <div className='card__header'>
                <div className='card__picture h-32'>
                    <div className='card__picture-overlay'>
                        &nbsp;
                        <img className="card__picture-img" src={`https://natours-e3yq.onrender.com/img/tours/${review.tour?.imageCover}`} alt={review.tour?.name}/>
                    </div>
                </div>
                </div>
                <h3 className="heading-tertirary text-left h-6	 top-0 left-0"><span> {review.tour?.name} </span></h3>

                <div className="card__footer flex justify-between items-center">
                    <div className="flex flex-col items-start flex-1">
                       {
                        !isEditing && 
                        <>
                             <p className="text-start"> {review.review} </p>
                            <div className="reviews__rating flex items-start mt-3"> 
                                {
                                    [1,2,3,4,5].map(item => review.rating >= item ? <BsStarFill className="reviews__star reviews__star--active" /> : <BsStar className="reviews__star" /> )
                                }
                            </div>
                        </>
                       }
                       {
                        isEditing && 
                        <>
                            <textarea className="w-full border-2 outline-none p-3 rounded-md" value={editedReview}  onChange={(e) =>setEditedReview(e.target.value)} />
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
                            <button className="mt-4 border-green-600 border-2 px-2 rounded-md font-bold uppercase" onClick={handleEditReview}>Save</button>
                        </>
                       }

                    </div>
                   
                    <div className="flex text-3xl gap-4 ms-4">
                        <button onClick={() => setIsEditing((cur) => !cur)}  className="text-sky-800"><BsPencilSquare /></button> 
                        <button onClick={handleReviewDelete}  className="text-red-600"><BsFillTrash3Fill /></button> 
                    </div>
                </div>
           
        </div>
    )
}

export default UserReviewCard
