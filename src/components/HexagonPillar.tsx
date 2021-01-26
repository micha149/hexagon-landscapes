import React from 'react';
import { Mesh, Color, MeshPhysicalMaterial, BufferGeometry } from 'three';
import { useGLTF } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { heightFactorState, seaLevelState } from './ControlPanel';

type HexagonPillarProps = {
    height: number,
    position: [number, number, number],
    color?: Color | string,
};

const HexagonPillar = ({ height, color, position: [x, y, z]}: HexagonPillarProps): JSX.Element | null => {
    const { nodes} = useGLTF('./models/pillar.glb');
    const mesh = nodes.Cylinder as Mesh<BufferGeometry, MeshPhysicalMaterial>;
    const heightFactor = useRecoilValue(heightFactorState);
    const seaLevel = useRecoilValue(seaLevelState);

    const meshHeight = (  - seaLevel) + 0.1;

    if (height * heightFactor < seaLevel) {
        return null;
    }

    return (
        <mesh geometry={mesh.geometry} receiveShadow castShadow position={[x, 0, y]} scale={[1, height * heightFactor - seaLevel , 1]}>
            <meshPhongMaterial
                normalMap={mesh.material.normalMap}
                normalScale={mesh.material.normalScale}
                normalMapType={mesh.material.normalMapType}
                attach="material" color={color}
            />
        </mesh>
    );
};

export default HexagonPillar;
