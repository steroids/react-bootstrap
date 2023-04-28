import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';
import {Icon} from '@steroidsjs/core/ui/content';
import {ILoaderProps} from '@steroidsjs/core/ui/layout/Loader/Loader';

export default function LoaderView(props:ILoaderProps & IBemHocOutput) {
    const bem = useBem('LoaderView');
    return (
        <div className={bem.block({
            color: props.color,
            size: props.size,
        })}
        >
            <div className={bem.element('loader')}>
                <Icon
                    className={bem.element('icon')}
                    name='loading'
                />
            </div>
        </div>
    );
}
