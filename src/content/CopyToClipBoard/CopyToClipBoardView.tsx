import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICopyToClipboardViewProps} from '@steroidsjs/core/ui/content/CopyToClipboard/CopyToClipboard';
import renderIcon from '../../utils/renderIcon';

function CopyToClipBoardView(props: ICopyToClipboardViewProps) {
    const bem = useBem('CopyToClipBoardView');

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

export default CopyToClipBoardView;
