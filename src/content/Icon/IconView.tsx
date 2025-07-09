import * as React from 'react';
import {IIconViewProps} from '@steroidsjs/core/ui/content/Icon/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import _omit from 'lodash-es/omit';

export default function IconView(props: IIconViewProps) {
    const bem = useBem('IconView');

    const omittedProps = _omit(props, 'contentEditable', 'icon', 'dataIcon');

    if (typeof props.icon === 'string' && props.icon.indexOf('<svg') === 0) {
        return (
            <span
                {...omittedProps}
                dangerouslySetInnerHTML={{__html: props.icon} /* eslint-disable-line react/no-danger */}
                aria-label={props.title}
                title={props.title}
                className={bem(bem.block(), props.className)}
                onClick={props.onClick}
                onKeyPress={props.onClick}
                role='button'
                tabIndex={props.tabIndex || 0}
                data-icon={props.dataIcon}
            />
        );
    }

    return (
        <span
            {...omittedProps}
            onClick={props.onClick}
            onKeyPress={props.onClick}
            role='button'
            tabIndex={props.tabIndex || 0}
            data-icon={props.dataIcon}
        >
            <img
                alt={props.title}
                title={props.title}
                src={props.icon}
                className={bem(bem.block(), props.className)}
            />
        </span>
    );
}
