float smin(float a, float b, float k) {
  float res = exp(-k * a) + exp(-k * b);
  return -log(res) / k;
}

#pragma glslify: export(smin)
