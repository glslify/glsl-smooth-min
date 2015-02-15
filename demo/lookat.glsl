mat3 calcLookAtMatrix(in vec3 camPosition, in vec3 camTarget, in float roll) {
  vec3 ww = normalize(camTarget - camPosition);
  vec3 uu = normalize(cross(ww, vec3(sin(roll), cos(roll), 0.0)));
  vec3 vv = normalize(cross(uu, ww));

  return mat3(uu, vv, ww);
}

#pragma glslify: export(calcLookAtMatrix)
