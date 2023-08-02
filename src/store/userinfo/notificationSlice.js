import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNotifications } from "../../services/NotificationService";

const initialState = {
	loading: false,
	notifications: [],
	error: '',
}

export const fetchNotifications = createAsyncThunk(
	'userinfo/fetchNotifications',
	async ({ user_id }) => {
		const response = await getNotifications(user_id);
		return response.data;
	}
)


export const routineNotification = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		updateNotification: (state, action) => {
			state.notifications = state.notifications.map((el) =>
				el.id === action.payload.id ? action.payload : el
			);
		},
		deleteNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(el) => el.id !== action.payload
			)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchNotifications.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchNotifications.fulfilled, (state, action) => {
			state.loading = false
			state.notifications = action.payload
			state.error = ''
		})
		builder.addCase(fetchNotifications.rejected, (state, action) => {
			state.loading = false
			state.notifications = []
			state.errors = action.error.message
		})
	},
})

export const { updateNotification, deleteNotification } = routineNotification.actions

export default routineNotification.reducer
