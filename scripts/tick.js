function tick(world) {
  let players = world.players

  for(let socketID in players) playerTick(world, socketID)


  // send all data to players
  world.socketHandler.sendData()
}
function playerTick(world, socketID) {
  let player = world.players[socketID]
}
module.exports = tick