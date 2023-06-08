import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user_info_id = 1;

const initialState = {
    loading: false,
    source_incomes: [],
    error: ""
};


export const fetchSourceIncomes = createAsyncThunk(
    "userinfo/fetchSourceIncomes",
    () => {
        return axios
            .get(`http://127.0.0.1:8000/user_source_income/?user_info_id=${user_info_id}`)
            .then(response => response.data);
    }
);


export const SourceIncomeSlice = createSlice({
    name: "source_income",
    initialState,
    reducers: {
        addNewSourceIncome: (state, action) => {
            state.source_incomes = [...state.source_incomes, action.payload];
        },
        updateSourceIncome: (state, action) => {
            state.source_incomes = state.source_incomes.map(
                el => el.id === action.payload.id ? action.payload : el
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSourceIncomes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSourceIncomes.fulfilled, (state, action) => {
            state.loading = false;
            state.source_incomes = action.payload;
            state.error = "";
        });
        builder.addCase(fetchSourceIncomes.rejected, (state, action) => {
            state.loading = false;
            state.source_incomes = [];
            state.errors = action.error.message;
        });
    }
});

export const {
    addNewSourceIncome,
    updateSourceIncome
} = SourceIncomeSlice.actions;
export default SourceIncomeSlice.reducer;
