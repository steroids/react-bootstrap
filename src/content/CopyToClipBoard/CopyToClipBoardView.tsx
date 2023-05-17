import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICopyToClipboardViewProps} from '@steroidsjs/core/ui/content/CopyToClipboard/CopyToClipboard';
import {Icon} from '@steroidsjs/core/ui/content';

function CopyToClipBoardView(props: ICopyToClipboardViewProps) {
    const bem = useBem('CopyToClipBoardView');

    return (
        <div className={bem(bem.block({
            disabled: props.disabled,
        }))}
        >
            {props.children}
            {props.showCopyIcon && (
                <Icon
                    name='copy'
                    onClick={props.onClick}
                    className={bem.element('icon')}
                />
            )}

        </div>
    );
}

export default CopyToClipBoardView;
