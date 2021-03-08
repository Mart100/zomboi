function tick(world) {
  let players = world.players
  let bullets = world.bullets

  for(let socketID in players) playerTick(world, socketID)
  for(let bullet of bullets) bulletTick(world, bullet)


  // send all data to players
  world.socketHandler.sendData()
}

function bulletTick(world, bullet) {
  
}

function playerTick(world, socketID) {
  let player = world.players[socketID]
}
module.exports = tick