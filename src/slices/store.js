import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import AuthSlice from './authSlice'
import { authApi } from '../api/authApi'
import AppSlice from './appSlice'
import { jobApi } from '../api/jobApi'
import { financeApi } from '../api/financeApi'
import { uploadApi } from '../api/uploadApi'

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        app: AppSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [financeApi.reducerPath]: financeApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware,
            financeApi.middleware,
            uploadApi.middleware
        )
    }
})

setupListeners(store.dispatch)
export default store