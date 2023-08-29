import ApiService from "./ApiService";

export async function getRoutineActionList(user_id) {
	return ApiService.fetchData({
		url: `/user_routine_action/?user_id=${user_id}&action_type=rotina`,
		method: 'get',
	})
}

export async function getInProgressRoutineActionList(user_id) {
	return ApiService.fetchData({
		url: `/user_routine_action/?user_id=${user_id}&status=em+andamento`,
		method: 'get',
	})
}

export async function getRoutineAction(id){
	return ApiService.fetchData({
		url: `/user_routine_action/${id}/`,
		method: 'get',
	})
}

export async function RoutineActionDelete(id) {
	return ApiService.fetchData({
		url: `/user_routine_action/${id}/`,
		method: 'delete',
	})
}

export async function postRoutineAction(data, id = null) {
	return ApiService.fetchData({
		url: `/user_routine_action/${id ? id + '/' : ''}`,
		method: id ? 'put' : 'post',
		data,
	})
}

export async function getWeeklyHoursSpent(id){
	return ApiService.fetchData({
		url: `/weekly_hours_spent/${id}/`,
		method: 'get',
	})
}