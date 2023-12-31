import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRoutineActionList } from "../../services/Module3/ActionService";


const initialState = {
	actions: [],
	loading: false,
	error: ""
};

export const fetchActions = createAsyncThunk(
	"action/fetchActions",
	async ({user_id, action_plan_id}) => {
		if (user_id) {
			const response = await getRoutineActionList(user_id, action_plan_id)
			return response.data
		} else {
			return []
		}
	}
);


export const actionSlice = createSlice({
	name: "action",
	initialState,
	reducers: {
		addAction: (state, action) => {
			state.actions = [...state.actions, action.payload];
		},
		updateAction: (state, action) => {
			state.actions = state.actions.map(
				(el) => el.id === action.payload.id ? action.payload : el
			);
		},
		delAction: (state, action) => {
			state.actions = state.actions.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchActions.fulfilled, (state, action) => {
				state.actions = action.payload;
				state.loading = false;
			})
			.addCase(fetchActions.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchActions.rejected, (state) => {
				state.loading = false;
			});
	}
});

export const { addAction, delAction, updateAction } = actionSlice.actions;

export default actionSlice.reducer;
