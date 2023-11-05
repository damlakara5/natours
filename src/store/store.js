import { configureStore } from '@reduxjs/toolkit'
import { allToursApi} from './allToursApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { getTourApi } from './getOneTour'

export const store = configureStore({
  reducer: {
        [allToursApi.reducerPath]: allToursApi.reducer,
        [getTourApi.reducerPath]: getTourApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(allToursApi.middleware, getTourApi.middleware),
})


setupListeners(store.dispatch)


