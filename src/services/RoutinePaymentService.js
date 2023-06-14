import ApiService from './ApiService'

export async function getRoutinePayments(user_info_id) {
	return ApiService.fetchData({
		url: `/user_routine_payment/?user_info_id=${user_info_id}/`,
		method: 'get',
	})
}
