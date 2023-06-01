import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 2,
    user_info_id: 1
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
    },
});

export const {setCurrentUser} = userSlice.actions

export default userSlice.reducer