import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    app: null
}

const AppSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setApp: (state, action) => {
            state.app = action.payload
        }
    }
})


export const { setApp } = AppSlice.actions

export default AppSlice