import store from "../store";

export const useUserID = () => {
	const { auth } = store.getState();
	return { userID: auth.user.user_info_id };
};