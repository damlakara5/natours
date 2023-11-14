import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTours,  getTopFive,  getWithin } from "../services/getData";
import { toast } from "react-toastify";
import { useFavs } from "./useFavs";
import { useMemo } from "react";
import { useGetBookings } from "./useGetBookings";

export const useGetTour =( ) => {
    const queryClient = useQueryClient()

    const { data: allTours,  isLoading: allToursLoading } = useQuery({ 
        queryKey: ['allTours'],
        queryFn: getAllTours,
      }); 

      const {favs, favsIsLoading} = useFavs()
      const {bookings} = useGetBookings()


      const isFavorited = (tourId, favorites) => {
        return favorites.some(fav => fav.id === tourId);
      };
      
      const allToursWithFavs = useMemo(() => {
        if (!allToursLoading && !favsIsLoading && allTours?.data && favs?.data) {
          return allTours.data.data.map(tour => ({
            ...tour,
            isFav: isFavorited(tour.id, favs.data.tours),
          }));
        }
        return [];
      }, [allTours, favs, allToursLoading, favsIsLoading]);

      const isBooked= (tourId, favorites) => {
        return favorites.some(fav => fav.id === tourId);
      };
      
      const allToursWithFavsAndBooked = useMemo(() => {
        if (!allToursLoading  && allToursWithFavs && bookings?.tours) {
          return allToursWithFavs.map(tour => ({
            ...tour,
            isBooked: isBooked(tour.id, bookings.tours),
          }));
        }
        return [];
      }, [bookings, allToursWithFavs, allToursLoading]);


      

      const {mutate: getTopFiveTours, data: topFiveTour, isLoading: topFiveIsLoading } = useMutation({
        mutationFn: getTopFive,
        mutationKey: ["allTours"],
        onSuccess:()=> {
            queryClient.invalidateQueries("allTours")
        
        },
        onError: err => toast.error(err.message)
    })

      const {mutate: getToursWithin, data: toursWithin, isLoading: toursWithinIsLoading } = useMutation({
        mutationFn: (param) => getWithin(param),
        mutationKey: ["allTours"],
        onSuccess:()=> {
            queryClient.invalidateQueries("allTours")
        
        },
        onError: err => toast.error(err.message)
    })


    const tours =  allToursWithFavsAndBooked?.length !== 0 ? allToursWithFavsAndBooked : allTours?.data.data

      return {allTours, allToursLoading, getTopFiveTours, topFiveTour, topFiveIsLoading, getToursWithin, toursWithinIsLoading, toursWithin, allToursWithFavs, allToursWithFavsAndBooked, tours}
      
}