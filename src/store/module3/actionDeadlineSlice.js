import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActionDeadlineList } from "../../services/Module3/ActionDeadlineService";


const initialState = {
	action_deadlines: [],
	loading: false,
	error: ""
};

export const fetchActionDeadlines = createAsyncThunk(
	"actionDeadline/fetchActionDeadlines",
	async ({ action_plan_id }) => {
		if (action_plan_id) {
			const response = await getActionDeadlineList(action_plan_id);
			return response.data;
		} else {
			return [];
		}
	}
);


export const ActionDeadlineSlice = createSlice({
	name: "actionDeadline",
	initialState,
	reducers: {
		addActionDeadline: (state, action) => {
			state.action_deadlines = [...state.action_deadlines, action.payload];
		},
		updateActionDeadline: (state, action) => {
			state.action_deadlines = state.action_deadlines.map(
				(el) => el.id === action.payload.id ? action.payload : el
			);
		},
		delActionDeadline: (state, action) => {
			state.action_deadlines = state.action_deadlines.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchActionDeadlines.fulfilled, (state, action) => {
				state.action_deadlines = action.payload;
				state.loading = false;
			})
			.addCase(fetchActionDeadlines.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchActionDeadlines.rejected, (state) => {
				state.loading = false;
			});
	}
});

export const { addActionDeadline, delActionDeadline, updateActionDeadline } = ActionDeadlineSlice.actions;

export default ActionDeadlineSlice.reducer;
