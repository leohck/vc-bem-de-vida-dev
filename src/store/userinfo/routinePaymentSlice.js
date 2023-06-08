import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user_info_id = 1;

const initialState = {
    loading: false,
    routine_payments: [],
    error: '',
};


export const fetchRoutinePayments = createAsyncThunk(
    'userinfo/fetchRoutinePayments',
    () => {
        return axios
            .get(`http://127.0.0.1:8000/user_routine_payment/?user_info_id=${user_info_id}`)
            .then(response => response.data)
    }
)


export const routinePaymentSlice = createSlice({
    name: "routine_payment",
    initialState,
    reducers: {
        addNewPayment: (state, action) => {
            state.routine_payments = [...state.routine_payments, action.payload]
        },
        deletePayment: (state, action) => {
            state.routine_payments = state.routine_payments.filter(
                el => el.id !== action.payload
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoutinePayments.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchRoutinePayments.fulfilled, (state, action) => {
            state.loading = false
            state.routine_payments = action.payload
            state.error = ''
        })
        builder.addCase(fetchRoutinePayments.rejected, (state, action) => {
            state.loading = false
            state.routine_payments = []
            state.errors = action.error.message
        })
    }
});

export const { addNewPayment, deletePayment } = routinePaymentSlice.actions
export default routinePaymentSlice.reducer
