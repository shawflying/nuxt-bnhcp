var Nuxt = require('../node_modules/nuxt')
var express = require('express')

var api = require('./api')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 6800

var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var apps = express()
// socket.io
// const http = require('http').Server(apps)
const server = require('http').createServer(apps)
const io = require('socket.io')(server)

app.set('port', port)

// Import API Routes
app.use('/api', api)
io.on('connection', (socket) => {
  console.log('a user connected : ' + socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected : ' + socket.id)
  })
  socket.on('add-list', (msg) => {
    socket.emit('now-playlist', msg)
  })
})

// Start nuxt.js
async function start() {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instanciate nuxt.js
  const nuxt = await new Nuxt(config)
  // Add nuxt.js middleware
  app.use(nuxt.render)
  // Build in development
  if (config.dev) {
    // console.log(config.dev)
    try {
      await nuxt.build()
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    }
  }
  // Listen the server
  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()

