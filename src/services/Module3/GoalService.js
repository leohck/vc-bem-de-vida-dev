import ApiService from "../ApiService";


export async function getGoalList(user_id) {
	return ApiService.fetchData({
		url: `/goal/?user_id=${user_id}`,
		method: 'get'
	});
}


export async function postGoal(data) {
	return ApiService.fetchData({
		url: '/goal/',
		method: 'post',
		data
	});
}


export async function deleteGoal(goal_id) {
	return ApiService.fetchData({
		url: `/goal/${goal_id}/`,
		method: 'delete'
	});
}


export async function putGoal(goal_id, data) {
	return ApiService.fetchData({
		url: `/goal/${goal_id}/`,
		method: 'put',
		data
	});
}