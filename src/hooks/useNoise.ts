import { useMemo } from 'react';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';

type NoiseFn = (x: number, y: number) => number;

const OCTAVES = 4;
const PERSISTANCE = .45;
const LACUNARITY = 1.87;
const SCALE = 20;

const useNoise = (seed: number): NoiseFn => {
    const simplex = useMemo(() => createNoise2D(alea(seed)), [seed]);

    return (x, y) => {
        let amplitude = 1;
        let frequency = 1;
        let noiseHeight = 0;

        for (let i = 0; i < OCTAVES; i += 1) {
            const sampleX = x / SCALE * frequency;
            const sampleY = y / SCALE * frequency;

            const value = simplex(sampleX, sampleY);
            noiseHeight += value * amplitude;
            noiseHeight /= 1 + amplitude;

            amplitude *= PERSISTANCE;
            frequency *= LACUNARITY;
        }

        return (noiseHeight + 1) / 2;
    }
}

export default useNoise;
