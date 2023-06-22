import ApiService from './ApiService'


export async function updateSkill(id, value) {
	return ApiService.fetchData({
		url: `/skills/${id}/`,
		method: 'patch',
		data: {
			value: value,
		},
	})
}