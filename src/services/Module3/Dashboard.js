import ApiService from "../ApiService";

export async function getDashboard31Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard31/${userID}/`,
		method: 'get'
	});
}

export async function getDashboard32Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard32/${userID}/`,
		method: 'get'
	});
}

export async function getDashboard33Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard33/${userID}/`,
		method: 'get'
	});
}
