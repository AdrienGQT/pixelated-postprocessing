import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import PixelatedEffect from "./PixelatedEffect";

export default function App() {
    return (
        <Canvas
            camera={{
                position: [4, 3, 4],
            }}
            shadows
            className="webgl"
        >
            <OrbitControls />

            <ambientLight args={[0xffffff, 0.5]} />
            <directionalLight position={[3, 3, 3]} castShadow />

            <mesh position={[0, 0, 2]} castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="red" />
            </mesh>

            <mesh position={[2, 0, -2]} castShadow receiveShadow>
                <sphereGeometry args={[1]} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh position={[-2, 0, -1]} castShadow receiveShadow>
                <torusKnotGeometry args={[0.5]} />
                <meshStandardMaterial emissive="orange" emissiveIntensity={3} />
            </mesh>

            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, -1, 0]}
                receiveShadow
            >
                <planeGeometry args={[8, 8]} />
                <meshStandardMaterial color="green" roughness={0.9} />
            </mesh>

            <EffectComposer>
                <Bloom intensity={1.0} luminanceThreshold={1.0} mipmapBlur />
                <PixelatedEffect colorDepth={32} gridResolution={128} />
            </EffectComposer>
        </Canvas>
    );
}
