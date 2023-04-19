import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import _get from 'lodash-es/get';
import {IAvatarColumnViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';

import './AvatarColumnView.scss';

export default function AvatarColumnView(props: IAvatarColumnViewProps) {
    const bem = useBem('AvatarColumnView');

    return (
        <div className={bem(
            bem.block({
                size: props.size,
            }),
        )}
        >
            <img
                src={_get(props.item, props.avatar)}
                alt="avatar"
            />
        </div>
    );
}
