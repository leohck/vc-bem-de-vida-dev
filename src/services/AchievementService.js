import ApiService from './ApiService'


export async function getAchievement(id) {
	return ApiService.fetchData({
		url: `/achievements/${id}/`,
		method: 'get',
	})
}

export async function updateAchievement(id, data) {
	return ApiService.fetchData({
		url: `/achievements/${id}/`,
		method: 'patch',
		data
	})
}