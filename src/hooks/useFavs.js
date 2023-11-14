import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavs, setFavs as setFavsApi} from "../services/getData";

export const useFavs = () => {
  const queryClient = useQueryClient();

    const { data: favs,  isLoading: favsIsLoading } = useQuery({ 
        queryKey: ['favs'],
        queryFn: getFavs,
      }); 

     const {mutate: setFavs, isLoading: isSettingFavs} = useMutation({
      mutationFn: (id) => setFavsApi(id),
      onSuccess: () => queryClient.invalidateQueries("favs")
     })

    return {favs, favsIsLoading, setFavs, isSettingFavs }

}