import ApiService from "../ApiService";

export async function getDashboard11Data(userID) {
	return ApiService.fetchData({
		url: `/dashboard11/${userID}/`,
		method: 'get'
	});
}
