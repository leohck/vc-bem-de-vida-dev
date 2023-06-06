import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user_info_id = 1;

const initialState = {
    loading: false,
    currentUser: null,
    error: ""
};

export const fetchUserInfo = createAsyncThunk(
    "userinfo/fetchUserInfo",
    () => {
        return axios
            .get(`http://127.0.0.1:8000/user_info/${user_info_id}`)
            .then(response => response.data);
    }
);


export const userInfoSlice = createSlice({
    name: "userinfo",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = "";
        });
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.currentUser = {};
            state.errors = action.error.message;
        });
    }
});

export const { setCurrentUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
