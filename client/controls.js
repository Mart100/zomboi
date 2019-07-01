let movement = new Vector()
let keys = {}
let mouseDown = false
let mouseLocked = false
let mouseMovement = {}

$(() => {
  $(document).on('keydown', (e) => { keys[e.keyCode] = true  })
  $(document).on('keyup',   (e) => { keys[e.keyCode] = false })

  // when mouse move
  document.addEventListener("mousemove", (event) => { mouseMovement = {x: event.movementX, y: event.movementY, latest: 0} })

  // on mouse lock and unlock
  if ("onpointerlockchange" in document) { document.addEventListener('pointerlockchange', lockChange, false) } 
  else if ("onmozpointerlockchange" in document) { document.addEventListener('mozpointerlockchange', lockChange, false) }

  // on mouse down and up 
  $('canvas').on('mousedown', () => { 
    mouseDown = true
    socket.emit('shoot')
  })
  $('canvas').on('mouseup', () => { mouseDown = false })
  setInterval(controlsLoop, 10)
})


function lockChange() {
  if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) mouseLocked = true
  else mouseLocked = false
}


// LOOP
function controlsLoop() {



  // MOVEMENT
  movement = new Vector()
  if(keys[87]) { // W
    let rot = rotation.y + Math.PI/2
    let vec = new Vector(Math.cos(rot), Math.sin(rot), 0)
    vec.multiply(3)
    movement.plus(vec)
  }

  if(keys[83]) { // S
    let rot = rotation.y - Math.PI/2
    let vec = new Vector(Math.cos(rot), Math.sin(rot), 0)
    vec.multiply(3)
    movement.plus(vec)
  }

  if(keys[65]) { // A
    let rot = rotation.y - Math.PI
    let vec = new Vector(Math.cos(rot), Math.sin(rot), 0)
    vec.multiply(3)
    movement.plus(vec)
  }
  
  if(keys[68]) { // D
    let rot = rotation.y
    let vec = new Vector(Math.cos(rot), Math.sin(rot), 0)
    vec.multiply(3)
    movement.plus(vec)
  }
  movement.setMagnitude(0.1)
  if(keys[16]) movement.setMagnitude(0.15)

  // other players collision
  for(let bodyID in playerBodys) {
    if(bodyID == socket.id) continue
    let playerBody = playerBodys[bodyID]
    let ownBody = playerBodys[socket.id]
    let firstBB = new THREE.Box3().setFromObject(ownBody)
    let secondBB = new THREE.Box3().setFromObject(playerBody)
    let collision = firstBB.intersectsBox(secondBB)
    if(collision) {
      let ownPos = new Vector(ownBody.position.x, ownBody.position.y, ownBody.position.z)
      let otherPos = new Vector(playerBody.position.x, playerBody.position.y, playerBody.position.z)
      let vec = ownPos.minus(otherPos)
      vec.setMagnitude(0.1)
      movement.x += vec.x
      movement.y += vec.y
    }
  }

  // ROTATING
  let oldRotation = JSON.parse(JSON.stringify(rotation))
  if(mouseMovement.latest < 10 && mouseLocked) {
    rotation.y = ((mouseMovement.x)/-1000)+rotation.y

    // x rotation
    if(mouseMovement.y > 0 && rotation.x > 0 ||
      mouseMovement.y < 0 && rotation.x < Math.PI) {
      rotation.x = ((mouseMovement.y)/-1000)+rotation.x
    }
  }
  camera.rotation.order = "ZYX"
  camera.rotation.x = rotation.x
  camera.rotation.z = rotation.y
  socket.emit('rotation', {x: rotation.x, y: rotation.y})
  mouseMovement.latest++
}