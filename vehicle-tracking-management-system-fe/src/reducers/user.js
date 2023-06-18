import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user"));

export const userSlice = createSlice({
    //name of the slice
    name: "user",
    initialState: { value: initialState},
    //reducer to specify how app state should change
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state, action) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.value = null;
        }
    }
})

export const { login, logout} = userSlice.actions;
export default userSlice.reducer;