import {useBem} from '@steroidsjs/core/hooks';
import {IEmptyViewProps} from '@steroidsjs/core/ui/list/Empty/Empty';
import * as React from 'react';

export default function EmptyView(props: IEmptyViewProps) {
    const bem = useBem('EmptyView');
    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            {props.text}
        </div>
    );
}
