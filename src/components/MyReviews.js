import { useUser } from "../context/userContext"
import UserReviewCard from "./UserReviewCard"
import { useReviews } from "../hooks/useReviews"
import Loading from "./Loading"
import Sidebar from "./ui/Sidebar"
import Main from "./ui/Main"

function MyReviews() {
    const {user} = useUser()
    const {reviews, reviewsLoading}= useReviews(user._id)


   if(reviewsLoading) return <Loading />





    return (
        <Main>
            <Sidebar  active="My Reviews" />
            {
                reviews.data.data.length === 0 && <div className="text-3xl mt-32">You haven't commented on any tours yet. You can comment on the tours you booked.</div>
            }
            <div className="flex-1 grid grid-cols-2 gap-10 mx-6 my-5">
                {
                    reviews?.data.data.map((review,i) => <UserReviewCard  key={i} review={review} />)
                }
                
            </div>
            
        </Main>
    )
}

export default MyReviews
