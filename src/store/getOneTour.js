

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const getTourApi = createApi({
    reducerPath: 'getTourApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://natours-e3yq.onrender.com/api/v1/' }),
    endpoints: (builder) => ({
      getTour: builder.query({  // Renamed endpoint
        query: (id) => `tours/${id}`,
      }),
    }),
});

// Export the auto-generated hook for the query
export const { useGetTourQuery } = getTourApi;
