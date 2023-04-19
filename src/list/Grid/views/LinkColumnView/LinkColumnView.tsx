import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import _get from 'lodash-es/get';
import {ILinkColumnViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';

import './LinkColumnView.scss';
import {Link} from '@steroidsjs/core/ui/nav';
import Format from '@steroidsjs/core/ui/format/Format';

export default function LinkColumnView(props: ILinkColumnViewProps) {
    const bem = useBem('LinkColumnView');

    return (
        <div className={bem(
            bem.block({
                size: props.size,
            }),
        )}
        >
            <Link
                url={_get(props.item, props.link.urlProperty)}
                target='blank'
                className={bem.element('link')}
            >
                <Format
                    item={props.item}
                    model={props.model}
                    {...props}
                    {...(props.formatter || {})}
                    attribute={props.link.property}
                />
            </Link>
            <span className={bem.element('subtitle')}>{_get(props.item, props.subtitle)}</span>
        </div>
    );
}
