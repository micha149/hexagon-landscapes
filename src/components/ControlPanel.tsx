import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { BehaviorSubject } from 'rxjs';

export const showHelpersState = atom<boolean>({
    key: 'showHelpers',
    default: false,
});

export const gridSizeState = atom<number>({
    key: 'gridSize',
    default: 10,
});

export const heightFactorSubject = new BehaviorSubject<number>(0.3);
export const heightFactorState = atom<number>({
    key: 'heightFactor',
    default: 0,
    effects_UNSTABLE: [
        ({ trigger, onSet, setSelf }) => {
            if (trigger === 'get') {
                setSelf(heightFactorSubject.getValue());
            }
            onSet(v => heightFactorSubject.next(v as number));
        }
    ]
});

export const seaLevelSubject = new BehaviorSubject<number>(0.1);
export const seaLevelState = atom<number>({
    key: 'seaLevel',
    default: 0,
    effects_UNSTABLE: [
        ({ trigger, onSet, setSelf }) => {
            if (trigger === 'get') {
                setSelf(seaLevelSubject.getValue());
            }
            onSet(v => seaLevelSubject.next(v as number));
        }
    ]
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
                <input id="heightFactor" value={heightFactor * 100} onChange={e => setHeightFactor(parseInt(e.target.value, 10) / 100)} type="range" min="0" max="100" />
            </div>

            <div>
                <label htmlFor="seaLevel">Sea Level</label>
                <input id="seaLevel" value={seaLevel * 50} onChange={e => setSeaLevel(parseInt(e.target.value, 10) / 50)} type="range" min="0" max="50" />
            </div>
        </div>
    );
};

export default ControlPanel;
