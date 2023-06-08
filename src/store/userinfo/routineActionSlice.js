import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user_info_id = 1;

const initialState = {
    loading: false,
    routine_actions: [],
    error: '',
};


export const fetchRoutineActions = createAsyncThunk(
    'userinfo/fetchRoutineActions',
    () => {
        return axios
            .get(`http://127.0.0.1:8000/user_routine_action/?user_info_id=${user_info_id}`)
            .then(response => response.data)
    }
)


export const routineActionSlice = createSlice({
    name: "routine_action",
    initialState,
    reducers: {
        addNewAction: (state, action) => {
            state.routine_actions = [...state.routine_actions, action.payload]
        },
        deleteAction: (state, action) => {
            state.routine_actions = state.routine_actions.filter(
                el => el.id !== action.payload
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoutineActions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchRoutineActions.fulfilled, (state, action) => {
            state.loading = false
            state.routine_actions = action.payload
            state.error = ''
        })
        builder.addCase(fetchRoutineActions.rejected, (state, action) => {
            state.loading = false
            state.routine_actions = []
            state.errors = action.error.message
        })
    }
});

export const { addNewAction, deleteAction } = routineActionSlice.actions

export default routineActionSlice.reducer
