import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('user')) || {
    isAuthenticated: false,
    userDetails: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload;
            state.isAuthenticated = true;
            state.userDetails = userData;
            localStorage.setItem('user', JSON.stringify(state));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userDetails = null;
            localStorage.removeItem('user');
        },
        updateUserDetails: (state, action) => {
            const updatedDetails = action.payload;
            state.userDetails = { ...state.userDetails, ...updatedDetails };
            localStorage.setItem('user', JSON.stringify(state));
        },
    },
});

export const { login, logout, updateUserDetails } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
