import React, { Suspense } from 'react'
import { RecoilRoot } from 'recoil';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <Suspense fallback={null}>
                <div className="h-full relative bg-gray-800">
                    <Canvas className="absolute inset-0 z-0"/>
                </div>
                <ControlPanel />
            </Suspense>
        </RecoilRoot>
    );
};

export default App;
