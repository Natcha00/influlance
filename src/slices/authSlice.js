import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    registerInfo: null
}



const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setRegisterInfo: (state, action) => {
            state.registerInfo = action.payload
        }
    }
})

export const { setIsAuth, setRegisterInfo } = authSlice.actions

export default authSlice