import * as React from 'react';
import {useMount} from 'react-use';
import {useBem} from '@steroidsjs/core/hooks';
import {IDropDownViewProps} from '@steroidsjs/core/ui/content/DropDown/DropDown';

import './DropDownView.scss';

export default function DropDownView(props: IDropDownViewProps) {
    const bem = useBem('DropDownView');

    useMount(() => {
        props.calculatePosition(props.forwardedRef.current.getBoundingClientRect());
    });

    return (
        <div
            ref={props.forwardedRef}
            className={bem(
                bem.block({
                    show: props.isComponentVisible,
                    [`position-${props.position}`]: !!props.position,
                }),
                props.className
            )}
            style={props.style}
        >
            {props.content()}
        </div>
    );
}