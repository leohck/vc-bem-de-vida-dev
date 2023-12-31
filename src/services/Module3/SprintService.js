import ApiService from "../ApiService";

export async function getSprintData(userID) {
	return ApiService.fetchData({
		url: `/sprint/${userID}/`,
		method: 'get'
	});
}


export async function finishSprint(sprintID) {
	return ApiService.fetchData({
		url: `/sprint_finish/${sprintID}/`,
		method: 'get'
	});
}


export async function createSprint(userID, estimated_days) {
	return ApiService.fetchData({
		url: `/sprint_config/?user_id=${userID}`,
		method: 'post',
		data: {
			user: userID,
			estimated_days: estimated_days
		}
	});
}


export async function StartStopSprint(sprintID, data) {
	return ApiService.fetchData({
		url: `/sprint_config/${sprintID}/`,
		method: 'put',
		data
	});
}



export async function createSprintAction(sprintID, actionID) {
	return ApiService.fetchData({
		url: `/sprint_action/`,
		method: 'post',
		data: {
			sprint: sprintID,
			action_info: actionID
		}
	});
}


export async function deleteSprintAction(sprintActionID) {
	return ApiService.fetchData({
		url: `/sprint_action/${sprintActionID}/`,
		method: 'delete'
	});
}

export async function getInProgressSprintActionList(user_id) {
	return ApiService.fetchData({
		url: `/sprint_action/?action_info__action__user_id=${user_id}&action_info__action__status=em+andamento`,
		method: 'get',
	})
}

