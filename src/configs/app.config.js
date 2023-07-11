let apiPrefix = 'http://127.0.0.1:8000/'
if (process.env.NODE_ENV === 'production') {
    apiPrefix = 'https://vcbemdevida-back.herokuapp.com/'
}
apiPrefix = 'https://vcbemdevida-back.herokuapp.com/'
const appConfig = {
    apiPrefix: apiPrefix,
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
