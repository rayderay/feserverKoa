'use strict'

const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const compose = require('composable-middleware');
const config = require('../config/environment');
const uuid = require('uuid/v4');

function isAuthenticated(){
	return async function(ctx, next){
		try{
			const token = ctx.query.jwt;
			if(token){
				try{
					let payload = await jwt.verify(token, 'ray');	
				}catch(err){
					console.log('verify fail', err);
				}
				
			}else{
				ctx.status = 403,
				ctx.body = {
					succeed:false,
					errorCode:1,
					errorMessage: 'require jwt'
				}
				return;
			}
			await next();
		}catch(err){
			console.log(err)
			if(err.status === 401){
				ctx.status = 401,
				ctx.body = {
					succeed:false,
					errorCode:2,
					errorMessage: 'forbidden'
				}
				}else{
					ctx.status = 404,
					ctx.body = {
						succeed:false,
						errorCode:3,
						errorMessage: 'feserver failed'
					}
				}
			}
		}
	
};


function isSignToken(data){
	let id = data.id;
	
	let access = jwt.sign({id: id}, 'ray', {
		expiresIn: config.secrets.sessionExpress || '30m'
	});

	let key = data.sessionId || 'feserver-' + uuid();

	return {
		jwt: access,
		expiresIn: config.secrets.sessionExpress,
		sessionId: data.sessionId || key
	}


}

module.exports = {
	isSignToken: isSignToken,
	isAuthenticated: isAuthenticated

}