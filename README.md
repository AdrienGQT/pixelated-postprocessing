# Pixelated postprocessing

Pixelated postprocessing effect using R3F, `Effect` class from processing library and a custom GLSL fragment shader. The effect can be applied by adding the `PixelatedEffect.jsx` component into an `EffectComposer` from @react-three/postprocessing library

## Code

### React component (JSX)

```js
import { Effect, BlendFunction } from "postprocessing";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export default function PixelatedEffect({
    colorDepth = 64,
    gridResolution = 128,
}) {
    const effect = useMemo(() => {
        return new Effect("PixelatedEffect", fragmentShader, {
            blendFunction: BlendFunction.NORMAL,
            uniforms: new Map([
                ["uColorDepth", new THREE.Uniform(colorDepth)],
                ["uGridResolution", new THREE.Uniform(gridResolution)],
                [
                    "uResolution",
                    new THREE.Uniform(
                        new THREE.Vector2(
                            window.innerWidth,
                            window.innerHeight,
                        ),
                    ),
                ],
            ]),
        });
    });

    useEffect(() => {
        const onResize = () => {
            const uResolution = effect.uniforms.get("uResolution");

            if (uResolution) {
                uResolution.value.set(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [effect]);

    return <primitive object={effect} />;
}
```

### Fragment Shader (GLSL)

```glsl
uniform float uColorDepth;
uniform float uGridResolution;
uniform vec2 uResolution;

void mainUv(inout vec2 uv) {
    float gridResolution = uGridResolution;
    float aspect = uResolution.x / uResolution.y;

    uv.x *= aspect;
    uv = floor(uv * gridResolution) / gridResolution;
    uv.x /= aspect;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = inputColor;

    color.rgb = floor(color.rgb * uColorDepth) / uColorDepth;

    outputColor = vec4(color.rgb, color.a);
}
```

## Demo

Try the demo here: 
https://pixelated-postprocessing.vercel.app/