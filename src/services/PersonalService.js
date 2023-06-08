import ApiService from "./ApiService";

export async function yourApi() {
    return ApiService.fetchData({
        url: "http://127.0.0.1:8000/questions/",
        method: "get"
    });
}

export async function getAspectTitleQuestions(user_info_id, title) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/questions?user_info_id=${user_info_id}&title=${title}`,
        method: "get"
    });
}

export async function updateAspectRating(question_id, new_rating) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/questions/${question_id}/`,
        method: "patch",
        data: {
            "rating": new_rating
        }
    });
}

export async function getDashboardData(user_info_id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/dashboard/${user_info_id}/`,
        method: "get"
    });
}

export async function getDashboard2Data(user_info_id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/dashboard2/${user_info_id}/`,
        method: "get"
    });
}

export async function getDashboard2ActionData(user_info_id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/dashboard2_actions/${user_info_id}/`,
        method: "get"
    });
}


export async function getSkills() {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/skills/`,
        method: "get"
    });
}


export async function postSkills(data) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/skills/`,
        method: "post",
        data
    });
}

export async function deleteSkill(skill_id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/skills/${skill_id}`,
        method: "delete"
    });
}

export async function getAchievements() {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/achievements/`,
        method: "get"
    });
}


export async function postAchievements(data) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/achievements/`,
        method: "post",
        data
    });
}

export async function deleteAchievement(achievement_id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/achievements/${achievement_id}`,
        method: "delete"
    });
}

export async function deleteItem(item_type, skill_id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/${item_type}/${skill_id}`,
        method: "delete"
    });
}

export async function postItem(item_type, data) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/${item_type}/`,
        method: "post",
        data
    });
}


export async function postRoutinePayment(data) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_routine_payment/`,
        method: "post",
        data
    });
}

export async function postRoutineAction(data) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_routine_action/`,
        method: "post",
        data
    });
}

export async function postSourceIncome(data, id = null) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_source_income/${ id ? id + '/' : ''}`,
        method: id ? 'put' : 'post',
        data
    });
}

export async function SourceIncomeDelete(id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_source_income/${id}/`,
        method: 'delete'
    });
}

export async function RoutinePaymentDelete(id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_routine_payment/${id}/`,
        method: 'delete'
    });
}

export async function RoutineActionDelete(id) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_routine_action/${id}/`,
        method: 'delete'
    });
}

export async function putUserInfo(user_info_id, data) {
    return ApiService.fetchData({
        url: `http://127.0.0.1:8000/user_info/${user_info_id}/`,
        method: "put",
        data
    });
}