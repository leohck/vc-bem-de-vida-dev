import ApiService from './ApiService'

export async function getSourceIncomeList(user_id) {
	return ApiService.fetchData({
		url: `/user_source_income/?user_id=${user_id}`,
		method: 'get',
	})
}

export async function getSourceIncome(id) {
	return ApiService.fetchData({
		url: `/user_source_income/${id}/`,
		method: 'get',
	})
}

export async function postSourceIncome(data, id = null) {
	return ApiService.fetchData({
		url: `/user_source_income/${id ? id + '/' : ''}`,
		method: id ? 'put' : 'post',
		data,
	})
}

export async function SourceIncomeDelete(id) {
	return ApiService.fetchData({
		url: `/user_source_income/${id}/`,
		method: 'delete',
	})
}