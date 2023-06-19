import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSkills } from '../../services/PersonalService'

export const fetchSkills = createAsyncThunk(
    'skills/fetchSkills',
    async ({ user_id }) => {
        const response = await getSkills(user_id)
        return response.data
    }
)

const initialState = {
    skills: [],
    loading: false,
}

export const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        addSkill: (state, action) => {
            state.skills = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.skills = action.payload
                state.loading = false
            })
            .addCase(fetchSkills.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSkills.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { addSkill } = skillsSlice.actions

export default skillsSlice.reducer
