import React, { Fragment } from 'react';

type GridPosition = {
    q: number,
    r: number,
    s: number,
};

type CartesianPosition = {
    x: number,
    y: number,
    z: number,
};

type HexagonGridProps = {
    size: number,
    circle?: boolean,
    children: (position: GridPosition & CartesianPosition) => JSX.Element,
};

function keyFromPosition(pos: GridPosition) {
    return `${pos.q}.${pos.r}.${pos.s}`;
}

function cubeDistance(a: GridPosition, b: GridPosition): number {
    return (Math.abs(a.q - b.q) + Math.abs(a.r - b.r) + Math.abs(a.s - b.s)) / 2
}

function circleFilter(doFilter: boolean, size: number): (pos: GridPosition) => boolean {
    if (!doFilter) return () => true;
    return pos => cubeDistance({q: 0, r: 0, s: 0}, pos) <= size
}


const HexagonGrid = ({ size, circle = false, children }: HexagonGridProps): JSX.Element => {
    const edgeLength = 2 * size + 1;
    const positions = Array.from({ length: edgeLength**2 }, (_, idx) => {
        const q = (idx % edgeLength) - size;
        const r = Math.floor( idx / edgeLength) - size;
        const s = 0 - q - r;

        const x = (Math.sqrt(3) * q + Math.sqrt(3)/2 * r) / 2
        const y = 3 / 2 * r / 2
        const z = 0;

        return { q, r, s, x, y, z };
    })

    return (
        <>
            {positions.filter(circleFilter(circle, size)).map(pos => (
                <Fragment key={keyFromPosition(pos)}>
                    {children(pos)}
                </Fragment>
            ))}
        </>
    );
};

export default HexagonGrid;
