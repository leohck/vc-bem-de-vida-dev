import ApiService from "../ApiService";

export async function getDashboard11Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard11/${userID}/`,
		method: 'get'
	});
}

export async function getDashboard12Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard12/${userID}/`,
		method: 'get'
	});
}
