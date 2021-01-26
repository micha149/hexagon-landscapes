import generateUuid from './uuid';

describe('uuid util', () => {
    it('generates a uuid', () => {
        const uuid = generateUuid();
        expect(uuid).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);
    });

    it('generates uuids randomly', () => {
        const samples = new Set();

        for(let i = 0; i < 50; i += 1) {
            const uuid = generateUuid();
            samples.add(uuid);
        }

        expect(samples.size).toEqual(50);
    });
});