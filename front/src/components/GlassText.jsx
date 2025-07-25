import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center, Environment, OrbitControls } from '@react-three/drei';

export default function GlassText({text}) {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <Environment preset="sunset" />
            <Suspense fallback={null}>
                <Center>
                    <Text3D
                        font="/fonts/helvetiker_regular.typeface.json" // ✅ uses your downloaded font
                        size={1}
                        height={0.5}
                        bevelEnabled
                        bevelThickness={0.03}
                        bevelSize={0.02}
                        bevelSegments={5}
                    >
                        {text}
                        <meshPhysicalMaterial
                            color="#ffffff"
                            transmission={1.5} // 🧊 makes it glass
                            roughness={0.1}
                            thickness={0.5}
                            clearcoat={1}
                            reflectivity={1}
                        />
                    </Text3D>
                </Center>
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
