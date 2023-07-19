import store from "../store";

export const useMainUserID = () => {
	const { auth } = store.getState();
	return { userID: auth.user.user_id };
};