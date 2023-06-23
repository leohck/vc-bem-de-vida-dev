import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
	wishes: [],
	loading: false,
	error: ""
};

export const fetchWishes = createAsyncThunk(
	"wishes/fetchWishes",
	() => {
		return [
			{
				id: 21,
				value: "comprar triplex",
				icon: "4"
			}
		] ;
	}
	// async ({ user_id }) => {
	// 	const response = await getwishes(user_id);
	// 	return response.data;
	// }
);


export const wishesSlice = createSlice({
	name: "wishes",
	initialState,
	reducers: {
		addWish: (state, action) => {
			state.wishes = [...state.wishes, action.payload];
		},
		updateWish: (state, action) => {
			state.wishes = state.wishes.map(
				(el) => el.id === action.payload.id ? action.payload : el
			);
		},
		deleteWish: (state, action) => {
			state.wishes = state.wishes.filter(
				(el) => el.id !== action.payload
			);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWishes.fulfilled, (state, action) => {
				state.wishes = action.payload;
				state.loading = false;
			})
			.addCase(fetchWishes.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchWishes.rejected, (state) => {
				state.loading = false;
			});
	}
});

export const { addWish, deleteWish, updateWish } = wishesSlice.actions;

export default wishesSlice.reducer;
