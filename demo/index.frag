precision mediump float;

// The majority of this shader is sourced from:
// https://www.shadertoy.com/view/ldfSWs
//
// Courtesy again of Iñigo Quílez.

#pragma glslify: lookAt = require(./lookat)
#pragma glslify: frame = require(glsl-square-frame)
#pragma glslify: smin = require(../)

uniform float uTime;
uniform vec2  uSize;

float doModel(vec3 position) {
  // Determine the position of two spheres
  vec3 apos = position + vec3(sin(uTime * 0.8), cos(uTime * 0.71), 0.0);
  vec3 bpos = position - vec3(0.0, sin(uTime * 0.7), cos(uTime * 0.53));

  // Determine their respective distances from
  // the camera along the ray
  float a = length(apos) - 0.7;
  float b = length(bpos) - 0.7;

  // Smooth the two spheres together
  return smin(a, b, 0.8);
}

vec3 doMaterial(in vec3 position, in vec3 normal) {
  return vec3(0.2, 0.07, 0.01);
}

vec3 doLighting(
  in vec3 pos,
  in vec3 normal,
  in vec3 ray,
  in float dist,
  in vec3 materialColor
) {
  vec3 color = vec3(0.0);

  vec3  keyAngle = normalize(vec3(1.0,0.7,0.9));
  float keyAmplitude = max(dot(normal, keyAngle),0.0);

  color += keyAmplitude * vec3(4.00);
  color += 2.0;

  return materialColor * color;
}

vec3 calcNormal( in vec3 pos ) {
  const float eps = 0.002;

  const vec3 v1 = vec3( 1.0,-1.0,-1.0);
  const vec3 v2 = vec3(-1.0,-1.0, 1.0);
  const vec3 v3 = vec3(-1.0, 1.0,-1.0);
  const vec3 v4 = vec3( 1.0, 1.0, 1.0);

	return normalize(
      v1 * doModel(pos + v1 * eps)
    + v2 * doModel(pos + v2 * eps)
    + v3 * doModel(pos + v3 * eps)
    + v4 * doModel(pos + v4 * eps)
  );
}

float calcIntersection(in vec3 camPosition, in vec3 ray) {
  const float maxDistance  = 20.0;
  const float stepDistance = 0.001;

  float h = stepDistance;
  float t = 0.0;
  float dist = -1.0;

  for (int i = 0; i < 90; i++) {
    if (h < stepDistance || t > maxDistance) break;
    h = doModel(camPosition + ray * t);
    t += h;
  }

  if (t < maxDistance) dist = t;

  return dist;
}

void main() {
  vec2  pixPos     = frame(uSize, gl_FragCoord.xy);
  float camRotate  = 0.3 * uTime;
  vec3  camPos     = vec3(3.5 * sin(camRotate), 1.0, 3.5 * cos(camRotate));
  vec3  camTarget  = vec3(0.0);
  mat3  camMatrix  = lookAt(camPos, camTarget, 0.0);
  float lensLength = 1.5;

  vec3 ray   = normalize(camMatrix * vec3(pixPos, lensLength));
  vec3 color = vec3(0.0);

  float dist = calcIntersection(camPos, ray);

  // If the ray hits, update color for surface
  if (dist > -0.5) {
    vec3 pos = camPos + dist * ray;
    vec3 nor = calcNormal(pos);
    vec3 mal = doMaterial(pos, nor);

    color = doLighting(pos, nor, ray, dist, mal);
  }

  gl_FragColor = vec4(color, 1);
}
