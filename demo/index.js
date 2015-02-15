var glslify = require('glslify')
var Toy     = require('gl-toy')

var size   = new Float32Array(2)
var start  = Date.now()
var shader = glslify({
  vert: './index.vert',
  frag: './index.frag'
})

Toy(shader, function(gl, shader) {
  size[0] = gl.drawingBufferWidth
  size[1] = gl.drawingBufferHeight

  shader.uniforms.uSize = size
  shader.uniforms.uTime = (Date.now() - start) / 1000
})
