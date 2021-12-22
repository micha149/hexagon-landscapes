import React, { ChangeEvent } from 'react';

type SeedInputProps = {
    id: string,
    value: number
    onChange: (value: number) => void
};

const SeedInput = ({id, value, onChange}: SeedInputProps): JSX.Element => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value.replace(/[^0-9]/, ''), 10));
    };

    const handleRandomize = () => {
        onChange(Math.round(Math.random() * 1000));
    };

    return (
        <div>
            <input id={id} type="text" value={value} onChange={handleChange} />
            <button type="button" onClick={handleRandomize}>Randomize</button>
        </div>
    );
};

export default SeedInput;
