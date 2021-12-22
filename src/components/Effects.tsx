import React from 'react';
import { EffectComposer, SSAO, Bloom, Vignette, } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

const Effects = (): JSX.Element => {
    return (
        <EffectComposer>
            <SSAO
                blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
                samples={31}
                radius={6}
                // @ts-ignore
                intensity={50}
            />
            <Bloom kernelSize={KernelSize.LARGE} />
            <Vignette />
        </EffectComposer>
    );
};

export default Effects;
