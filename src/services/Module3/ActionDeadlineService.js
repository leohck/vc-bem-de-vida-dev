import ApiService from "../ApiService";


export async function getActionDeadlineList(action_plan_id) {
	return ApiService.fetchData({
		url: `/action_deadline/?action_plan_id=${action_plan_id}`,
		method: 'get'
	});
}


export async function postActionDeadline(data) {
	return ApiService.fetchData({
		url: '/action_deadline/',
		method: 'post',
		data
	});
}

export async function getActionDeadline(actionPlanID, actionID) {
	return ApiService.fetchData({
		url: `/action_deadline/?action_plan_id=${actionPlanID}&action_id=${actionID}`,
		method: 'get'
	});
}


export async function deleteActionDeadline(action_deadline_id) {
	return ApiService.fetchData({
		url: `/action_deadline/${action_deadline_id}/`,
		method: 'delete'
	});
}


export async function putActionDeadline(action_deadline_id, data) {
	return ApiService.fetchData({
		url: `/action_deadline/${action_deadline_id}/`,
		method: 'put',
		data
	});
}