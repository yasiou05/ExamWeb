import React, { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

export default function HappyModel({
    url = "/models/batman.gltf",
    scale = [0.2, 0.2, 0.2],          // 🔽 shrink it!
    position = [0, -1.5, 0],          // 🔽 move down
    rotation = [0, Math.PI, 0],       // 🔄 face camera
}) {
    const model = useGLTF('/models/happy/scene.gltf');;
    return (
        <Suspense fallback={null}>
            <primitive
                object={model.scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </Suspense>
    );
}