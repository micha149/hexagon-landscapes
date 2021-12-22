import React from 'react';
import { Euler } from 'three'
import { OrbitControls } from '@react-three/drei';
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilValue } from 'recoil';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import HexagonGrid from './HexagonGrid';
import HexagonPillar from './HexagonPillar';
import SimplexNoise from 'simplex-noise';
import LightSetup from './LightSetup';
import { showHelpersState, gridSizeState } from './ControlPanel';

const simplex = new SimplexNoise('42');

type CanvasProps = {
    className?: string
};

const Canvas: React.FC<CanvasProps> = ({ className }) => {
    const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
    const showHelpers = useRecoilValue(showHelpersState);
    const gridSize = useRecoilValue(gridSizeState);

    const isometricAngle = new Euler(Math.atan(- 1 / Math.sqrt(2)), - Math.PI / 4, 0, 'YXZ');

    return (
        <div className={className}>
            <ThreeCanvas frameloop="demand" shadows camera={{ position: [20, 0, 20], rotation: isometricAngle, near: 1, far: 1000 }}>
                <RecoilBridge>
                    <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI * 0.35} minDistance={15} maxDistance={30} />
                    <LightSetup />
                    {showHelpers ? <axesHelper scale={[50, 50, 50]}/> : null}
                    <HexagonGrid circle size={gridSize}>
                        {({x, y, z}) => {
                            const height = (simplex.noise2D(x / 10, y / 10) / 2 + 0.5);

                            return (
                                <HexagonPillar
                                    height={height}
                                    position={[x, y, z]}
                                />
                            )
                        }}
                    </HexagonGrid>
                     <EffectComposer>
                         <SSAO
                             blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
                             samples={31}
                             radius={6}
                             intensity={50}
                         />
                     </EffectComposer>
                </RecoilBridge>
            </ThreeCanvas>
        </div>
    )
}
export default Canvas;
