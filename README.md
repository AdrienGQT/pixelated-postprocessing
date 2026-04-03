# Pixelated postprocessing

Pixelated postprocessing effect using R3F, `Effect` class from processing library and a custom GLSL fragment shader. The effect can be applied by adding the `PixelatedEffect.jsx` component into an `EffectComposer` from @react-three/postprocessing library

## Code

### React component (JSX)

```js
import { Effect } from "postprocessing";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export default function PixelatedEffect({
    colorDepth = 64,
    gridResolution = 128,
}) {
    const effect = useMemo(() => {
        return new Effect("PixelatedEffect", fragmentShader, {
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

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float gridResolution = uGridResolution;

    float aspect = uResolution.x / uResolution.y;

    vec2 squareUv = uv;
    squareUv.x *= aspect;

    vec2 customUv = floor(squareUv * gridResolution) / gridResolution;
    customUv.x /= aspect;

    vec4 color = texture2D(inputBuffer, customUv);

    color.x = floor(color.x * uColorDepth) / uColorDepth;
    color.y = floor(color.y * uColorDepth) / uColorDepth;
    color.z = floor(color.z * uColorDepth) / uColorDepth;

    outputColor = color;
}
```

## Demo

Try the demo here: 
https://pixelated-postprocessing.vercel.app/