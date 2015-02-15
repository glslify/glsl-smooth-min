# glsl-smooth-min

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Smooth minimum functions for GLSL, sourced from
[Iñigo Quílez's article](http://www.iquilezles.org/www/articles/smin/smin.htm).

Particularly useful when doing Shadertoy-style raymarching with distance
fields: you can smoothly blend between two volumes, instead of doing a
hard union with `min(a, b)`.

**[Check it out in action](http://stack.gl/glsl-smooth-min)**

![](http://imgur.com/H7vqNm4.png)

## Usage

[![NPM](https://nodei.co/npm/glsl-smooth-min.png)](https://nodei.co/npm/glsl-smooth-min/)

### `smin(float a, float b, float k)`

Blends smoothly between `a` and `b`, with a smoothing amount
determined by the value of `k`. For example:

``` glsl
#pragma glslify: smin = require(glsl-smooth-min)

float doModel(vec3 position) {
  // Take two sphere volumes
  float a = length(position + 0.5) - 0.7;
  float b = length(position - 0.5) - 0.7;

  // And smooth them together
  return smin(a, b, 0.8);
}
```

There are three variants of this function available, all with the
same function signature:

``` glsl
#pragma glslify: poly = require(glsl-smooth-min/poly)
#pragma glslify: pow = require(glsl-smooth-min/pow)
#pragma glslify: exp = require(glsl-smooth-min/exp)

// Exports `poly` by default
#pragma glslify: poly = require(glsl-smooth-min)
```

Each of these variants differ somewhat in their results,
and some are more appropriate in specific situations:

> These three functions produce smooth results, with different qualities. The three accept a paramter *k* that controls the radious/distance of the smoothness. From these three, probably the polynomial is the fastest, and also the easiest to control, for *k* maps directly to a blending band size/distance. Unlike the other two, it probably suffers from second order discontinuities (derivatives), but visually is pleasing enough for most applications.

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glsl-smooth-min/blob/master/LICENSE.md) for details.
