import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function LoaderView(props: IBemHocOutput) {
    const bem = useBem('LoaderView');
    return (
        <div className={bem.block()}>
            <div className={bem.element('loader')} />
        </div>
    );
}
