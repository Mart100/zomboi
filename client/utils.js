function rotateAroundWorldAxis(object, axis, radians) {
  let rotWorldMatrix = new THREE.Matrix4()
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians)
  rotWorldMatrix.multiply(object.matrix)
  object.matrix = rotWorldMatrix 
  object.rotation.setFromRotationMatrix(object.matrix)
}