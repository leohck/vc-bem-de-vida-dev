import ApiService from './ApiService'


export async function getAspectTitleQuestions(user_info_id, title) {
    return ApiService.fetchData({
        url: `/questions/?user_info_id=${user_info_id}&title=${title}`,
        method: 'get',
    })
}

export async function updateAspectRating(question_id, new_rating) {
    return ApiService.fetchData({
        url: `/questions/${question_id}/`,
        method: 'patch',
        data: {
            rating: new_rating,
        },
    })
}

export async function getDashboardData(user_info_id) {
    return ApiService.fetchData({
        url: `/dashboard/${user_info_id}/`,
        method: 'get',
    })
}

export async function getDashboard2Data(user_info_id) {
    return ApiService.fetchData({
        url: `/dashboard2/${user_info_id}/`,
        method: 'get',
    })
}

export async function getDashboard2ActionData(user_info_id) {
    return ApiService.fetchData({
        url: `/dashboard2_actions/${user_info_id}/`,
        method: 'get',
    })
}

export async function getSkills(user_info_id) {
    return ApiService.fetchData({
        url: `/skills/?user_id=${user_info_id}`,
        method: 'get',
    })
}

export async function getAchievements(user_info_id) {
    return ApiService.fetchData({
        url: `/achievements/?user_id=${user_info_id}`,
        method: 'get',
    })
}

export async function deleteItem(item_type, skill_id) {
    return ApiService.fetchData({
        url: `/${item_type}/${skill_id}`,
        method: 'delete',
    })
}

export async function postItem(item_type, data) {
    return ApiService.fetchData({
        url: `/${item_type}/`,
        method: 'post',
        data,
    })
}


export async function putUserInfo(user_info_id, data) {
    return ApiService.fetchData({
        url: `/user_info/${user_info_id}/`,
        method: 'put',
        data,
    })
}
