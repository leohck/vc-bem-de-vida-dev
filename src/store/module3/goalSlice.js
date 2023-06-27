import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
	goals: [],
	loading: false,
	error: ""
};

export const fetchGoals = createAsyncThunk(
	"goal/fetchGoals",
	() => {
		return []
	}
	// async ({user_id}) => {
	// 	const response = await getWishList(user_id)
	// 	return response.data
	// }
);


export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		addGoal: (state, action) => {
			state.goals = [...state.goals, action.payload];
		},
		updateGoal: (state, action) => {
			state.goals = state.goals.map(
				(el) => el.id === action.payload.id ? action.payload : el
			);
		},
		delGoal: (state, action) => {
			state.goals = state.goals.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGoals.fulfilled, (state, action) => {
				state.goals = action.payload;
				state.loading = false;
			})
			.addCase(fetchGoals.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchGoals.rejected, (state) => {
				state.loading = false;
			});
	}
});

export const { addGoal, delGoal, updateGoal } = goalSlice.actions;

export default goalSlice.reducer;
