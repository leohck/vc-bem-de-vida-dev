import ApiService from "../ApiService";

export async function getRoutineActionList(user_id, action_plan_id) {
	return ApiService.fetchData({
		url: `/user_routine_action/?user_id=${user_id}&action_plan=${action_plan_id}`,
		method: 'get',
	})
}

export async function linkActionAndPlan(action_id, action_plan_id) {
	return ApiService.fetchData({
		url: `/link_action_and_plan/${action_id}/${action_plan_id}/`,
		method: 'get',
	})
}

export async function unlinkActionAndPlan(action_id, action_plan_id) {
	return ApiService.fetchData({
		url: `/unlink_action_and_plan/${action_id}/${action_plan_id}/`,
		method: 'get',
	})
}