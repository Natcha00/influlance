import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import AuthSlice from './authSlice'
import { authApi } from '../api/influencer/authApi'
import AppSlice from './appSlice'
import { jobApi } from '../api/influencer/jobApi'
import { financeApi } from '../api/influencer/financeApi'
import { uploadApi } from '../api/uploadApi'
import { mktAuthApi } from '../api/marketer/authApi'
import { mktJobApi } from '../api/marketer/jobApi'
import { mktFinanceApi } from '../api/marketer/financeApi'

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        app: AppSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [financeApi.reducerPath]: financeApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        [mktAuthApi.reducerPath]: mktAuthApi.reducer,
        [mktJobApi.reducerPath]: mktJobApi.reducer,
        [mktFinanceApi.reducerPath]: mktFinanceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware,
            financeApi.middleware,
            uploadApi.middleware,
            mktAuthApi.middleware,
            mktJobApi.middleware,
            mktFinanceApi.middleware
        )
    }
})

setupListeners(store.dispatch)
export default store