import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/sign-in/',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/api-auth/logout/',
        method: 'get',
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(userID, data) {
    return ApiService.fetchData({
        url: `/change_password/${userID}/`,
        method: 'put',
        data,
    })
}
