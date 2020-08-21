const Koa = require('koa');
const serve = require('koa-static');
const config = require('config');
const path = require('path');
const logger = require('koa-logger');
const router = require('koa-router')();
const fs = require("fs")
const app = new Koa();

app.use(logger())

app.use(serve(path.join(__dirname, '../dist/')));

router.get('/', ctx => {
  ctx.response.redirect('/index');
})

router.get('/index', ctx => {
	ctx.type = "text/html"
  ctx.body = fs.createReadStream(path.join(__dirname, '../dist/index.html'));
})

app.use(router.routes());
app.use(router.allowedMethods());
 
app.listen(config.port, () => {
  console.log(`Listening at port ${config.port}`);
});