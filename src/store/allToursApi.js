import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const allToursApi = createApi({
    reducerPath: 'allToursApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://natours-e3yq.onrender.com/api/v1/' }),
    endpoints: (builder) => ({
      getAllTours: builder.query({  // Renamed endpoint
        query: () => `tours`,
      }),
    }),
});

// Export the auto-generated hook for the query
export const { useGetAllToursQuery } = allToursApi;
