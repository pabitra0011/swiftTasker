import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

    isSidebarOpen: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // for login
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        // another for logout 
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        },

        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        }
    }
})


export const {
    setCredentials, logout, setOpenSidebar
} = authSlice.actions;

export default authSlice.reducer;