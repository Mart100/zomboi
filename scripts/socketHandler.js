const Vector = require('./vector.js')

class SocketHandler {
  constructor(world) {
    this.world = world
    this.sockets = {}
    this.buildings = world.buildings
    this.players = world.players
    this.bullets = world.bullets
    
  }
  addSocket(socket) {
    this.sockets[socket.id] = socket
    //init all the socket event
    socket.on('movement', data => this.movement(data, socket))
    socket.on('rotation', data => this.rotation(data, socket))
    socket.on('shoot', data => this.shoot(data, socket))
    let world = this.world
  }
  sendData() {
    this.sendPlayersData()
  }
  movement(data, socket) {
    this.players[socket.id].position.x += data.x
    this.players[socket.id].position.y += data.y
    this.players[socket.id].position.z += data.z
  }
  rotation(data, socket) {
    this.players[socket.id].rotation.x = data.x
    this.players[socket.id].rotation.y = data.y
  }
  shoot(data, socket) {
    let player = this.players[socket.id]
    let playerRotation = new Vector(player.rotation.x, player.rotation.y, 0)
    let bullet = {
      position: player.position,
      velocity: new Vector(0.1, 0.1, 0).rotate('all', playerRotation)
    }
    this.bullets.push(bullet)
    socket.emit('bullet', bullet)
  }
  sendPlayersData() {
    let data = {}

    // collect players data to send
    for(let id in this.players) {
      let player = this.players[id]
      data[id] = {
        position: player.position,
        rotation: player.rotation,
        id: player.id,
        holding: player.holding,
        coins: player.coins
      }
    }

    // send to everyone
    for(let socketID in this.players) this.players[socketID].socket.emit('players', data)
  }
}
module.exports = SocketHandler