'use strict'

const router = require('koa-router')();
const auth = require('../service/auth.service');


router.get('/test',auth.isAuthenticated(),async (ctx, next) => {
	console.log(111)
	ctx.body = 'ray'
});

router.get('/testFun',auth.isAuthenticated(),async (ctx, next) => {
	console.log(333)
	ctx.body = 'ray'
});

module.exports = router