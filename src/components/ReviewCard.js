import {BsStarFill, BsStar} from "react-icons/bs"

function ReviewCard({review}) {

    return (
            <div className="reviews__card">

                <div className="reviews__avatar">
                    <img className="reviews__avatar-img" src={`https://natours-e3yq.onrender.com/img/users/${review.user.photo}`} alt={`${review.user.name}`} />
                    <h6 className="reviews__user"> {review.user.name} </h6>
                </div>
                <p className="reviews__text"> {review.review} </p>
                <div className="reviews__rating mt-auto"> 
                    {
                        [1,2,3,4,5].map(item => review.rating >= item ? <BsStarFill className="reviews__star reviews__star--active" /> : <BsStar className="reviews__star" /> )
                    }
                </div>
            </div>
    )
}

export default ReviewCard
