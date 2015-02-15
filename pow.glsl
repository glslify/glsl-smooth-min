float smin(float a, float b, float k) {
  a = pow(a, k);
  b = pow(b, k);
  return pow((a * b) / (a + b), 1.0 / k);
}

#pragma glslify: export(smin)
