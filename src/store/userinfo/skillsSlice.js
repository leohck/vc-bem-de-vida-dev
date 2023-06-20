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
            state.skills = [...state.skills, action.payload]
        },
        updateSkill: (state, action) => {
            state.skills = state.skills.map((el) =>
                el.id === action.payload.id ? action.payload : el
            );
        },
        deleteSkill: (state, action) => {
            state.skills = state.skills.filter(
                (el) => el.id !== action.payload
            );
        }
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

export const { addSkill, deleteSkill, updateSkill } = skillsSlice.actions

export default skillsSlice.reducer
