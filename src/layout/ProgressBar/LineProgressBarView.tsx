import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IProgressBarViewProps} from '@steroidsjs/core/ui/layout/ProgressBar/ProgressBar';
import {useBem} from '@steroidsjs/core/hooks';

export default function LineProgressBarView(props: IProgressBarViewProps & IBemHocOutput) {
    const bem = useBem('LineProgressBarView');

    return (
        <div className={bem.block({size: props.size, status: props.status})}>
            <div className={bem.element('emptyLine')}>
                <div
                    className={bem.element('progressLine')}
                    style={{width: `${props.percent}%`}}
                />
            </div>
            <div className={bem.element('text')}>{props.label}</div>
        </div>
    );
}
