import ApiService from "../ApiService";


export async function getActionPlanList(goal_id) {
	return ApiService.fetchData({
		url: `/action_plan/?goal_id=${goal_id}`,
		method: 'get'
	});
}

export async function getActionPlanListAll(userID) {
	return ApiService.fetchData({
		url: `/action_plan_list/${userID}/`,
		method: 'get'
	});
}


export async function postActionPlan(data) {
	return ApiService.fetchData({
		url: '/action_plan/',
		method: 'post',
		data
	});
}


export async function deleteActionPlan(action_plan_id) {
	return ApiService.fetchData({
		url: `/action_plan/${action_plan_id}/`,
		method: 'delete'
	});
}


export async function putActionPlan(action_plan_id, data) {
	return ApiService.fetchData({
		url: `/action_plan/${action_plan_id}/`,
		method: 'put',
		data
	});
}