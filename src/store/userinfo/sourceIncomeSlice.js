import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSourceIncomeList } from "../../services/SourceIncomeService";


const initialState = {
	loading: false,
	source_incomes: [],
	error: ""
};

export const fetchSourceIncomes = createAsyncThunk(
	"userinfo/fetchSourceIncomes",
	async ({ user_id }) => {
		const response = await getSourceIncomeList(user_id);
		return response.data;
	}
);

export const SourceIncomeSlice = createSlice({
	name: "source_income",
	initialState,
	reducers: {
		addNewSourceIncome: (state, action) => {
			state.source_incomes = [...state.source_incomes, action.payload];
		},
		updateSourceIncome: (state, action) => {
			state.source_incomes = state.source_incomes.map((el) =>
				el.id === action.payload.id ? action.payload : el
			);
		},
		deleteSourceIncome: (state, action) => {
			state.source_incomes = state.source_incomes.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSourceIncomes.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSourceIncomes.fulfilled, (state, action) => {
			state.loading = false;
			state.source_incomes = action.payload;
			state.error = "";
		});
		builder.addCase(fetchSourceIncomes.rejected, (state, action) => {
			state.loading = false;
			state.source_incomes = [];
			state.errors = action.error.message;
		});
	}
});

export const { addNewSourceIncome, updateSourceIncome, deleteSourceIncome } =
	SourceIncomeSlice.actions;
export default SourceIncomeSlice.reducer;
