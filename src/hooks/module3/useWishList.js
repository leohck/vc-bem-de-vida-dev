import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishes } from "../../store/module3/wishSlice";
import { useUserID } from "../useUserID";


export const useWishList = () => {
	const dispatch = useDispatch();
	const wishSlice = useSelector(state => state.module3.wishSlice);
	
	const { userID } = useUserID();
	
	const refreshWishList = () => {
		dispatch(fetchWishes({ user_id: userID }));
	};
	
	useEffect(() => {
		refreshWishList();
	}, [userID]);
	
	return {
		wishes: wishSlice.wishes,
		refreshWishList
	};
};