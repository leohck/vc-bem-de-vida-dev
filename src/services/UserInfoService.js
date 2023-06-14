import ApiService from './ApiService'

export async function getUserInfo(user_info_id) {
	return ApiService.fetchData({
		url: `/user_info/${user_info_id}/`,
		method: 'get',
	})
}
