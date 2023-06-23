import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getWishList} from "../../services/Module3/WishService";


const initialState = {
	wishes: [],
	loading: false,
	error: ""
};

export const fetchWishes = createAsyncThunk(
	"wishes/fetchWishes",
	async ({user_id}) => {
		const response = await getWishList(user_id)
		return response.data
	}
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
		delWish: (state, action) => {
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

export const { addWish, delWish, updateWish } = wishesSlice.actions;

export default wishesSlice.reducer;
