import { useQuery } from "@tanstack/react-query";
import { getTour } from "../services/getData";
import { useGetBookings } from "./useGetBookings";

export const useTour =(id) => {
    const { data,  isLoading: tourIsLoading } = useQuery({ 
        queryKey: ['tour'],
        queryFn: () => getTour(id),
      }); 

      const {bookings} = useGetBookings()

      

      const tour = data && data.data.data
      const date = tour?.startDates[0].toLocaleString('en-us', {month: 'long', year: 'numeric'})
      const paragraphs =  tour?.description.split('\n')

      const isBooked = bookings?.tours.some(e => e.id === id)


    return {tour, tourIsLoading, date, paragraphs, isBooked}
}

