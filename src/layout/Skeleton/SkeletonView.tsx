import {useBem} from '@steroidsjs/core/hooks';
import {ISkeletonViewProps} from '@steroidsjs/core/ui/layout/Skeleton/Skeleton';
import * as React from 'react';

export default function SkeletonView(props: ISkeletonViewProps) {
    const bem = useBem('SkeletonView');
    return (
        <span
            className={bem(props.className, bem.block({
                type: props.children ? null : props.type,
                animation: props.animation,
            }))}
            style={{
                height: props.height,
                width: props.width,
            }}
        >
            {props.children}
        </span>
    );
}
