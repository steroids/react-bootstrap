import * as React from 'react';

import {IEmptyViewProps} from '@steroidsjs/core/ui/list/Empty/Empty';
import {useBem} from '@steroidsjs/core/hooks';

export default function EmptyView(props: IEmptyViewProps) {
    const bem = useBem('EmptyView');
    return (
        <div
            className={bem(
                bem.block(),
                'text-center p-5',
                props.className,
            )}
        >
            {props.text}
        </div>
    );
}
