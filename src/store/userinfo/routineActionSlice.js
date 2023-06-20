import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRoutineActionList } from "../../services/RoutineActionService";


const initialState = {
    loading: false,
    routine_actions: [],
    error: '',
}

export const fetchRoutineActions = createAsyncThunk(
    'userinfo/fetchRoutineActions',
        async ({ user_id }) => {
            const response = await getRoutineActionList(user_id);
            return response.data;
    }
)

export const routineActionSlice = createSlice({
    name: 'routine_action',
    initialState,
    reducers: {
        addNewAction: (state, action) => {
            state.routine_actions = [...state.routine_actions, action.payload]
        },
        deleteAction: (state, action) => {
            state.routine_actions = state.routine_actions.filter(
                (el) => el.id !== action.payload
            )
        },
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
    },
})

export const { addNewAction, deleteAction } = routineActionSlice.actions

export default routineActionSlice.reducer
