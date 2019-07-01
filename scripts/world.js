const tick = require('./tick.js')
const SocketHandler = require('./socketHandler.js')

class World {
  constructor(id, settings) {
    this.id = id
    this.players = {}
    this.buildings = {}
    this.bullets = []
    this.socketHandler = new SocketHandler(this)
    this.tps = {
      latestTPS: process.hrtime()[0],
      startTickCount: 0
    }
    this.tickCount = 0
  }
  tick() {
    tick(this)
  }
  addPlayer(socket) {
    socket.join(this.id)

    let randomX = Math.random()*10
    let randomY = Math.random()*10

    this.players[socket.id] = {
      id: socket.id,
      socket: socket,
      coins: 0,
      health: 100,
      position: { x: 0, y: 0, z: 5 },
      movement: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0},
      holding: 'shotgun'
    }

    this.socketHandler.addSocket(socket)
  }
}

module.exports = World