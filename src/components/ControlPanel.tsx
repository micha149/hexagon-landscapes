import React from 'react';
import { atom, useRecoilState } from 'recoil';

export const showHelpersState = atom<boolean>({
    key: 'showHelpers',
    default: false,
});

export const gridSizeState = atom<number>({
    key: 'gridSize',
    default: 10,
});

export const heightFactorState = atom<number>({
    key: 'heightFactor',
    default: 3,
});

export const seaLevelState = atom<number>({
    key: 'seaLevelState',
    default: 0.1,
});

type ControlPanelProps = {
};

const ControlPanel = ({}: ControlPanelProps): JSX.Element => {
    const [ showHelpers, setShowHelpers ] = useRecoilState(showHelpersState);
    const [ gridSize, setGridSize ] = useRecoilState(gridSizeState);
    const [ heightFactor, setHeightFactor ] = useRecoilState(heightFactorState);
    const [ seaLevel, setSeaLevel ] = useRecoilState(seaLevelState);

    return (
        <div className="position absolute top-0 bg-gray-600 rounded">
            <label>
                <input type="checkbox" onChange={e => setShowHelpers(e.target.checked)} checked={showHelpers} />
                Show Helpers
            </label>

            <div>
                <label htmlFor="gridSize">Grid Size</label>
                <input id="gridSize" step={1} value={gridSize} onChange={e => setGridSize(parseInt(e.target.value))} type="range" min="3" max="30" />
            </div>

            <div>
                <label htmlFor="heightFactor">Height Factor</label>
                <input id="heightFactor" value={heightFactor * 10} onChange={e => setHeightFactor(parseInt(e.target.value) / 10)} type="range" min="0" max="50" />
            </div>

            <div>
                <label htmlFor="heightFactor">Sea Level</label>
                <input id="heightFactor" value={seaLevel * 10} onChange={e => setSeaLevel(parseInt(e.target.value) / 10)} type="range" min="0" max="50" />
            </div>
        </div>
    );
};

export default ControlPanel;
