import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import AuthSlice from './authSlice'
import { authApi } from '../api/authApi'
import AppSlice from './appSlice'
import { jobApi } from '../api/jobApi'

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        app: AppSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware
        )
    }
})

setupListeners(store.dispatch)
export default store