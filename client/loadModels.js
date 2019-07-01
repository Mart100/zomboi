let guns = {}
let city

const loader = new THREE.GLTFLoader()

// Load guns
loader.load('./models/shotgun.glb', (gltf) => { guns['shotgun'] = gltf.scene }, undefined, console.error)

// load city
loader.load('./models/city.glb', (gltf) => { 
  city = gltf.scene
  city.scale.x = 0.05
  city.position.z = 7
  city.position.x = 20
  city.position.y = 20
  city.scale.y = 0.05
  city.scale.z = 0.05
  city.rotation.x = Math.PI/2
  scene.add(city)
}, undefined, console.error)


