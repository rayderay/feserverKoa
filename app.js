const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt');
const router = require('koa-router')();
const api = require('./api/index');
const config = require('./config/environment')
//const tokenError 
const tokenError = require('./service/auth.service');
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//get jwt
app.use(router['routes']());
router.get('/jwt/:userId?', (ctx,next) => {
	console.log(333)
	let userId = ctx.params.userId || 19931015;
	let tokenInfo = require('./service/auth.service').isSignToken({userId: userId});
	ctx.body = tokenInfo.jwt
});

// routes
router.use('/api',api.routes(),api.allowedMethods());


// serve api doc


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
