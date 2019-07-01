let players = {}
let playerBodys = {}
let gunBodys = {}
socket.on('players', (data) => {
  players = data
  me = players[socket.id]
  for(let playerID in players) {
    let player = players[playerID]

    // create new player body and gun
    if(playerBodys[playerID] == undefined) {
      let geometry = new THREE.BoxGeometry(1, 1, 2)
      let material = new THREE.MeshStandardMaterial({ color: 'rgb(0,255,0)' })
      cube = new THREE.Mesh(geometry, material)
      cube.rotation.order = "ZYX"
      scene.add(cube)
      playerBodys[playerID] = cube

      // create new gun model
      let gun = guns[player.holding].clone()
      gun.scale.x = 1.5
      gun.scale.y = 1.5
      gun.scale.z = 1.5
      cube.rotation.order = "ZYX"
      gun.rotation.x = Math.PI/2
      scene.add(gun)
      gunBodys[playerID] = gun
    }

    // update playerBody
    let playerBody = playerBodys[playerID]
    playerBody.position.set(player.position.x, player.position.y, player.position.z)
    playerBody.rotation.set(0, 0, player.rotation.y)

    // update gun position
    let playerGun = gunBodys[playerID]
    playerGun.position.x = player.position.x
    playerGun.position.y = player.position.y
    playerGun.position.z = player.position.z
    let vec = new Vector(0.5, 0.5, 0).rotate('z', player.rotation.y)
    playerGun.rotation.y = player.rotation.y+Math.PI/2
    playerGun.position.x += vec.x
    playerGun.position.y += vec.y
    playerGun.position.z += vec.z

    // if me
    if(playerID == socket.id) {
      // set camera
      camera.position.x = player.position.x
      camera.position.y = player.position.y
      camera.position.z = player.position.z + 1
    }
  }
})