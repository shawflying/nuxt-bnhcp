'use strict';

// Start nuxt.js
var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var config, nuxt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Import and Set Nuxt.js options
            config = require('../nuxt.config.js');

            config.dev = !(process.env.NODE_ENV === 'production');
            // Instanciate nuxt.js
            _context.next = 4;
            return new Nuxt(config);

          case 4:
            nuxt = _context.sent;

            // Add nuxt.js middleware
            app.use(nuxt.render);
            // Build in development

            if (!config.dev) {
              _context.next = 16;
              break;
            }

            _context.prev = 7;
            _context.next = 10;
            return nuxt.build();

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](7);

            console.error(_context.t0); // eslint-disable-line no-console
            process.exit(1);

          case 16:
            // Listen the server
            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 12]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Nuxt = require('../node_modules/nuxt');
var express = require('express');

// var api = require('./api')

var app = express();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 6800;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apps = express();
// socket.io
// const http = require('http').Server(apps)
var server = require('http').createServer(apps);
var io = require('socket.io')(server);

app.set('port', port);

// Import API Routes
// app.use('/api', api)
io.on('connection', function (socket) {
  console.log('a user connected : ' + socket.id);
  socket.on('disconnect', function () {
    console.log('user disconnected : ' + socket.id);
  });
  socket.on('add-list', function (msg) {
    socket.emit('now-playlist', msg);
  });
});

start();