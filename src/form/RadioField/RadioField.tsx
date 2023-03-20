import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';

import './RadioField.scss';

export default function RadioField() {
    const bem = useBem('RadioField');

    return (
        <div className={bem.block()}>
        </div>
    );
}
