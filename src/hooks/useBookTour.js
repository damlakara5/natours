import { useMutation } from "@tanstack/react-query"
import { handleBookTour } from "../services/stripe"

export const useBookTour = (id) => {
    const {mutate: bookTour, data,} = useMutation({
        mutationFn: handleBookTour,
        mutationKey: ["tour"],
        onError: error => console.error('Error:', error.response ? error.response.data : error.message)

    })


    return {bookTour, data}
}