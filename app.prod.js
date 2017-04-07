function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = require('koa');
var app = new Koa();
var Nuxt = require('nuxt');

var config = require('./nuxt.config.js');
config.dev = !(app.env === 'production');

var nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  nuxt.build().catch(error => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use((() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset
    yield nuxt.render(ctx.req, ctx.res);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.listen(3000);
