precision mediump float;

attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 1, 1);
}
