const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: '"https://vcbemdevida-back.herokuapp.com',
			changeOrigin: true,
		})
	)
}