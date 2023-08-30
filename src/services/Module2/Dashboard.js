import ApiService from "../ApiService";

export async function getDashboard22(userID) {
	return ApiService.fetchData({
		url: `/dashboard22/${userID}/`,
		method: 'get'
	});
}
