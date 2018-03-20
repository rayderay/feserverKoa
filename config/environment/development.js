'use strict'

module.exports = {
	// logger level
	loggerLevel: 'debug',

	// Server port
	port: process.env.PORT || 3000,
  
	// Codis Server
	codis: {
	  /**host: '192.168.3.111',
	  port: 29000,
	  password: 'redis'**/
	},
  
	// Signature Auth
	signAuth: false,
	signAuthIgnore: false
}