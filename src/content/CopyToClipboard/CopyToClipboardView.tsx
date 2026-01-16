import useBem from '@steroidsjs/core/hooks/useBem';
import {ICopyToClipboardViewProps} from '@steroidsjs/core/ui/content/CopyToClipboard/CopyToClipboard';
import React from 'react';

import renderIcon from '../../utils/renderIcon';

function CopyToClipboardView(props: ICopyToClipboardViewProps) {
    const bem = useBem('CopyToClipboardView');

    return (
        <div
            className={bem(bem.block({
                disabled: props.disabled,
            }))}
            onClick={props.onClick}
        >
            {props.children}
            {props.showCopyIcon && renderIcon(props.icon || 'copy', {
                className: bem.element('icon'),
            })}
        </div>
    );
}

export default CopyToClipboardView;
