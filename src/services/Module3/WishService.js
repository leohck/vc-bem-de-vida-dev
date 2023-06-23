import ApiService from "../ApiService";


export async function getWishList(user_id) {
	return ApiService.fetchData({
		url: `/wish/?user_id=${user_id}`,
		method: 'get'
	});
}


export async function postWish(data) {
	return ApiService.fetchData({
		url: '/wish/',
		method: 'post',
		data
	});
}


export async function deleteWish(wish_id) {
	return ApiService.fetchData({
		url: `/wish/${wish_id}/`,
		method: 'delete'
	});
}


export async function putWish(wish_id, data) {
	return ApiService.fetchData({
		url: `/wish/${wish_id}/`,
		method: 'put',
		data
	});
}