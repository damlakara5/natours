import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/getData";

export const useGetBookings = () => {
    const { data: bookings,  isLoading: bookingsIsLoading } = useQuery({ 
        queryKey: ['bookings'],
        queryFn: getBookings,
      }); 

    return {bookings, bookingsIsLoading }

}