import {useBem} from '@steroidsjs/core/hooks';
import {IStepsViewProps} from '@steroidsjs/core/ui/list/Steps/Steps';
import React from 'react';

export default function StepsView(props: IStepsViewProps) {
    const bem = useBem('StepsView');
    return (
        <div className={bem(props.className, bem.block())}>
            {props.children}
        </div>
    );
}
