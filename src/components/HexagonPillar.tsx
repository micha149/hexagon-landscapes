import React from 'react';
import { Mesh, MeshPhysicalMaterial, BufferGeometry } from 'three';
import { useGLTF } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { heightFactorState, seaLevelState } from './ControlPanel';
import { interpolateRgbBasis } from 'd3-interpolate';

type HexagonPillarProps = {
    height: number,
    position: [number, number, number],
};

const seaColor = interpolateRgbBasis(['#0369A1', '#0EA5E9']);
const landColor = interpolateRgbBasis(['#FEF3C7', '#A3E635', '#84CC16', '#15803D', '#3F6212', '#57534E', '#334155', '#ffffff']);

const getColor = (height: number, seaLevel: number) => (
    height > seaLevel
        ? landColor(1 / (1 - seaLevel) * (height - seaLevel))
        : seaColor(1 / seaLevel * height)
);

const HexagonPillar = ({ height, position: [x, y, z]}: HexagonPillarProps): JSX.Element | null => {
    //@ts-ignore
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
                attach="material"
                color={getColor(height, 0)}
            />
        </mesh>
    );
};

export default HexagonPillar;
