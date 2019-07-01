// init project
const express = require('express')
const Socket = require('socket.io')
const app = express()

// import custom scripts
const tick = require('./scripts/tick.js')
const World = require('./scripts/world.js')

// listen on port :)
const server = app.listen(process.env.PORT || 3000, () => {
  console.log('zomboi is listening on port ' + server.address().port)
})

// other global variables
let worlds = {}

const io = Socket(server)


app.use('/', express.static('client'))

// create world
worlds['testing'] = new World('testing', {})

// run ticks
setInterval(() => {
  for(let num in worlds) worlds[num].tick()
}, 10)

// on client connect 
io.on('connection', (socket) => {
  // add to world
  worlds['testing'].addPlayer(socket)
})