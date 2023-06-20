import ApiService from './ApiService'

export async function getRoutinePayments(user_id) {
	return ApiService.fetchData({
		url: `/user_routine_payment/?user_id=${user_id}`,
		method: 'get',
	})
}

export async function getRoutinePayment(id) {
	return ApiService.fetchData({
		url: `/user_routine_payment/${id}/`,
		method: 'get',
	})
}


export async function postRoutinePayment(data, id = null) {
	return ApiService.fetchData({
		url: `/user_routine_payment/${id ? id + '/' : ''}`,
		method: id ? 'put' : 'post',
		data,
	})
}


export async function RoutinePaymentDelete(id) {
	return ApiService.fetchData({
		url: `/user_routine_payment/${id}/`,
		method: 'delete',
	})
}