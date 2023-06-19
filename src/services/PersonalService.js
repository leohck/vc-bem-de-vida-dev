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

export async function postSkills(data) {
    return ApiService.fetchData({
        url: `/skills/`,
        method: 'post',
        data,
    })
}

export async function deleteSkill(skill_id) {
    return ApiService.fetchData({
        url: `/skills/${skill_id}`,
        method: 'delete',
    })
}

export async function getAchievements(user_info_id) {
    return ApiService.fetchData({
        url: `/achievements/?user_id=${user_info_id}`,
        method: 'get',
    })
}

export async function postAchievements(data) {
    return ApiService.fetchData({
        url: `/achievements/`,
        method: 'post',
        data,
    })
}

export async function deleteAchievement(achievement_id) {
    return ApiService.fetchData({
        url: `/achievements/${achievement_id}`,
        method: 'delete',
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

export async function postRoutinePayment(data, id = null) {
    return ApiService.fetchData({
        url: `/user_routine_payment/${id ? id + '/' : ''}`,
        method: id ? 'put' : 'post',
        data,
    })
}

export async function postRoutineAction(data, id = null) {
    return ApiService.fetchData({
        url: `/user_routine_action/${id ? id + '/' : ''}`,
        method: id ? 'put' : 'post',
        data,
    })
}

export async function postSourceIncome(data, id = null) {
    return ApiService.fetchData({
        url: `/user_source_income/${id ? id + '/' : ''}`,
        method: id ? 'put' : 'post',
        data,
    })
}

export async function SourceIncomeDelete(id) {
    return ApiService.fetchData({
        url: `/user_source_income/${id}/`,
        method: 'delete',
    })
}

export async function RoutinePaymentDelete(id) {
    return ApiService.fetchData({
        url: `/user_routine_payment/${id}/`,
        method: 'delete',
    })
}

export async function RoutineActionDelete(id) {
    return ApiService.fetchData({
        url: `/user_routine_action/${id}/`,
        method: 'delete',
    })
}

export async function putUserInfo(user_info_id, data) {
    return ApiService.fetchData({
        url: `/user_info/${user_info_id}/`,
        method: 'put',
        data,
    })
}
