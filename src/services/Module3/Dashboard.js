import ApiService from "../ApiService";

export async function getDashboard31Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard31/${userID}/`,
		method: 'get'
	});
}
