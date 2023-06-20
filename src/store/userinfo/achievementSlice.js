import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAchievements } from '../../services/PersonalService'

export const fetchAchievements = createAsyncThunk(
	'achievement/fetchAchievements',
	async ({ user_id }) => {
		const response = await getAchievements(user_id)
		return response.data
	}
)

const initialState = {
	achievements: [],
	loading: false,
}

export const achievementSlice = createSlice({
	name: 'achievement',
	initialState,
	reducers: {
		addAchievement: (state, action) => {
			state.achievements = [...state.achievements, action.payload]
		},
		updateAchievement: (state, action) => {
			state.achievements = state.achievements.map((el) =>
				el.id === action.payload.id ? action.payload : el
			);
		},
		deleteAchievement: (state, action) => {
			state.achievements = state.achievements.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAchievements.fulfilled, (state, action) => {
				state.achievements = action.payload
				state.loading = false
			})
			.addCase(fetchAchievements.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchAchievements.rejected, (state) => {
				state.loading = false
			})
	},
})

export const { addAchievement, deleteAchievement, updateAchievement } = achievementSlice.actions

export default achievementSlice.reducer
