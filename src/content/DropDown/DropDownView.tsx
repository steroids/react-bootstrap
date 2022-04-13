import _isFunction from 'lodash-es/isFunction';
import * as React from 'react';
import {useMount} from 'react-use';
import {useBem, useComponents} from '@steroidsjs/core/hooks';
import {IDropDownViewProps} from '@steroidsjs/core/ui/content/DropDown/DropDown';

import './DropDownView.scss';
import {useMemo} from 'react';

export default function DropDownView(props: IDropDownViewProps) {
    const bem = useBem('DropDownView');
    const {ui} = useComponents();

    useMount(() => {
        props.calculatePosition(props.forwardedRef.current.getBoundingClientRect());
    });

    const contentProps = useMemo(() => ({
        onClose: props.onClose,
    }), [props.onClose]);
    let content = props.content();
    if (_isFunction(content)) {
        content = ui.renderView(content, contentProps);
    }

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
            {content}
        </div>
    );
}
