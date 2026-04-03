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
