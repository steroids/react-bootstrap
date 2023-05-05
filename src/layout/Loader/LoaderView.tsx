import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {Icon} from '@steroidsjs/core/ui/content';
import {ILoaderViewProps} from '@steroidsjs/core/ui/layout/Loader/Loader';

export default function LoaderView(props: ILoaderViewProps) {
    const bem = useBem('LoaderView');
    return (
        <div className={bem.block({
            color: props.color,
            size: props.size,
        })}
        >
            <Icon
                className={bem.element('icon')}
                name='loading'
            />
        </div>
    );
}
