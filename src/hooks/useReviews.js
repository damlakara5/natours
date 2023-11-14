import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createReviewOnTour, deleteReview as deleteReviewApi, editReview as editedReviewApi, getReviews} from "../services/getData"
import { toast } from "react-toastify";

export const useReviews = (id) => {
   const queryClient = useQueryClient();

     const {data: reviews, isLoading: reviewsLoading} = useQuery({
        queryKey: ["reviews",id],
        queryFn: getReviews,
        enabled: !!id,
     })


     const {mutate: createReview} = useMutation({
      mutationFn:({ id, reqData }) => createReviewOnTour({ id, reqData }),
      onSuccess: () => {
         toast.success("Your review added successfully!")
         queryClient.invalidateQueries("reviews")
      }
     })

     
     const {mutate: editReview} = useMutation({
      mutationFn:({ id, reqData }) => editedReviewApi({ id, reqData }),
      onSuccess: () => {
         toast.success("Tour review updated successfully!")
         queryClient.invalidateQueries("reviews")
      }
     })

     const {mutate: deleteReview} = useMutation({
      mutationFn:({ id }) => deleteReviewApi({ id }),
      onSuccess: () => {
         toast.success("Review successfully deleted!")
         queryClient.invalidateQueries("reviews")
      }
     })
     return {reviews, reviewsLoading, createReview, editReview ,deleteReview}
    
}