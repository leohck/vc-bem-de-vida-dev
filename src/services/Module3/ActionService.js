import ApiService from "../ApiService";


export async function getActionList(action_plan_id) {
	return ApiService.fetchData({
		url: `/action/?action_plan=${action_plan_id}`,
		method: 'get'
	});
}


export async function postAction(data) {
	return ApiService.fetchData({
		url: '/action/',
		method: 'post',
		data
	});
}


export async function deleteAction(action_id) {
	return ApiService.fetchData({
		url: `/action/${action_id}/`,
		method: 'delete'
	});
}


export async function putAction(action_id, data) {
	return ApiService.fetchData({
		url: `/action/${action_id}/`,
		method: 'put',
		data
	});
}