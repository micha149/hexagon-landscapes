import React, { useEffect, useRef } from 'react';
import { Mesh, MeshPhysicalMaterial, MeshPhongMaterial, BufferGeometry } from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { combineLatest } from 'rxjs';
import { seaLevelSubject, heightFactorSubject } from './ControlPanel';
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

const getHeight = (height: number, seaLevel: number, factor: number) => (height > seaLevel ? ((height - seaLevel) * (factor * 10)) : 0) + 0.2;

const height$ = combineLatest([ seaLevelSubject, heightFactorSubject ]);

const HexagonPillar = ({ height, position: [x, y, z]}: HexagonPillarProps): JSX.Element | null => {
    //@ts-ignore
    const { nodes} = useGLTF('./models/pillar.glb');
    const invalidate = useThree(state => state.invalidate);
    const mesh = nodes.Cylinder as Mesh<BufferGeometry, MeshPhysicalMaterial>;
    const ref = useRef<Mesh<BufferGeometry, MeshPhongMaterial>>(null);

    useEffect(() => {
        const subscription = height$.subscribe(([seaLevel, heightFactor]) => {
            ref.current?.scale.setY(getHeight(height, seaLevel, heightFactor))
            ref.current?.material.color.setStyle(getColor(height, seaLevel));
            ref.current?.material.color.convertSRGBToLinear();
            invalidate();
        });
        return () => subscription.unsubscribe();
    }, [height, invalidate]);

    return (
        <mesh ref={ref} geometry={mesh.geometry} receiveShadow castShadow position={[x, 0, y]} scale={[1, getHeight(height, 0, 0), 1]}>
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
