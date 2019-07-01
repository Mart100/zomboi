const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()
let controls
let canvas
let mainLight
let floor
let rotation = {x:0,y:0,z:0}

$(() => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Lock mouse when click on canvas
  canvas = $('canvas')[0]
  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock
  document.addEventListener('click', () => {canvas.requestPointerLock() })

  // light
  let light = new THREE.DirectionalLight('rgb(255,255,255)', 10)
  light.position.set(0, 0, 5)
  light.target.position.set(0, 0, 0)
  scene.add(light)

  // ambient light
  scene.add(new THREE.AmbientLight('rgb(255,255,255)', 1))


  // Instantiate a loader
  var loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load('./models/shotgun.glb', (gltf) => {

    gun = gltf.scene
    gun.scale.x = 1.5
    gun.scale.y = 1.5
    gun.scale.z = 1.5
    gun.rotation.x = Math.PI/2

    scene.add(gltf.scene)

  }, undefined, console.error)

  // floor
  let floor_geometry = new THREE.BoxGeometry(50, 50, 0.1)
  let floor_material = new THREE.MeshStandardMaterial({ color: 'rgb(0,0,0)' })
  floor = new THREE.Mesh(floor_geometry, floor_material)
  scene.add(floor)

  // TICKS
  setInterval(tick, 10)

  camera.position.set(0, -4, 4)
  camera.rotation.x = Math.PI/2 
  animate()
})


function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}