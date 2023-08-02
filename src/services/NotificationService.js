import ApiService from './ApiService'


export async function getNotifications(userID) {
	return ApiService.fetchData({
		url: `/notifications/?user_id=${userID}`,
		method: 'get',
	})
}



export async function setNotificationAsViewed(notification_id, data) {
	return ApiService.fetchData({
		url: `/notifications/${notification_id}/`,
		method: 'put',
		data
	})
}