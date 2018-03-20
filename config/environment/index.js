'use strict'

let all = {
	secrets: {
		session: 'hah',
		sessionExpire: '30m',
		refresh: 'yo',
		refreshExpire: '7d'
	},
	port: process.env.PORT || 3000,
	codis: {

	},
	signAuth: false,
	signAuthIgnore: false,
};

module.exports = Object.assign(
	all,
	require('./'+ (process.env.NODE_ENV || 'development') + '.js') || {}
)