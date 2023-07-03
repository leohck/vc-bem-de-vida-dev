import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActionPlanList, getActionPlanListAll } from "../../services/Module3/ActionPlanService";


const initialState = {
	action_plans: [],
	loading: false,
	error: ""
};

export const fetchActionPlans = createAsyncThunk(
	"actionPlan/fetchActionPlans",
	async ({goal_id}) => {
		if (goal_id) {
			const response = await getActionPlanList(goal_id)
			return response.data
		} else {
			const response = await getActionPlanListAll()
			return response.data
		}
	}
);


export const ActionPlanSlice = createSlice({
	name: "actionPlan",
	initialState,
	reducers: {
		addActionPlan: (state, action) => {
			state.action_plans = [...state.action_plans, action.payload];
		},
		updateActionPlan: (state, action) => {
			state.action_plans = state.action_plans.map(
				(el) => el.id === action.payload.id ? action.payload : el
			);
		},
		delActionPlan: (state, action) => {
			state.action_plans = state.action_plans.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchActionPlans.fulfilled, (state, action) => {
				state.action_plans = action.payload;
				state.loading = false;
			})
			.addCase(fetchActionPlans.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchActionPlans.rejected, (state) => {
				state.loading = false;
			});
	}
});

export const { addActionPlan, delActionPlan, updateActionPlan } = ActionPlanSlice.actions;

export default ActionPlanSlice.reducer;
