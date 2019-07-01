function tick() {
  let meBody = playerBodys[socket.id]
  for (var vertexIndex = 0; vertexIndex < meBody.geometry.vertices.length; vertexIndex++) {       
    var localVertex = meBody.geometry.vertices[vertexIndex].clone()
    var globalVertex = localVertex.applyMatrix4(meBody.matrix)
    var directionVector = globalVertex.sub(meBody.position)
    var ray = new THREE.Raycaster(meBody.position, directionVector.clone().normalize())
    let collisionResults = ray.intersectObjects(city.children, true)
    if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      for(let coll of collisionResults) {
        let ownPos = new Vector(meBody.position.x, meBody.position.y, meBody.position.z)
        let otherPos = new Vector(coll.point.x, coll.point.y, coll.point.z)
        let vec = ownPos.minus(otherPos)
        vec.setMagnitude(0.05)
        if(coll.point.z < 1.5) continue
        movement.x = vec.x
        movement.y = vec.y
      }
    }
  }
  if(me.position.z > 2) movement.z -= 0.05
  socket.emit('movement', movement.object())
}
