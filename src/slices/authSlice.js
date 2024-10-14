import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false
}



const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }
    }
})

export const { setIsAuth} = authSlice.actions

export default authSlice