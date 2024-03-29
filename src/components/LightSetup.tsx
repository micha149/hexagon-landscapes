import React, { useRef, MutableRefObject }  from 'react';
import { useRecoilValue } from 'recoil';
import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useHelper } from '@react-three/drei';
import { showHelpersState } from './ControlPanel';

const LightSetup = (): JSX.Element => {
    const showHelper = useRecoilValue(showHelpersState);
    const lightRef = useRef<DirectionalLight>() as MutableRefObject<DirectionalLight>;
    useHelper(showHelper && lightRef, DirectionalLightHelper);

    return (
        <>
            <ambientLight args={[0xe87888, 0.3]} />
            <directionalLight
                ref={lightRef}
                args={[0xf6e2c5, 0.7]} //0xeec48b
                castShadow
                position={[20, 20, 20]}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
                shadow-mapSize-width={8192}
                shadow-mapSize-height={8192}
            />
        </>
    );
};

export default LightSetup;
