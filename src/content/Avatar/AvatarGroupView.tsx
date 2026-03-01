import {useBem} from '@steroidsjs/core/hooks';
import {IAvatarGroupViewProps} from '@steroidsjs/core/ui/content/Avatar/AvatarGroup';
import * as React from 'react';

export default function Avatar(props: IAvatarGroupViewProps) {
    const bem = useBem('AvatarGroupView');
    return (
        <div className={bem.block()}>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            {props.children}
        </div>
    );
}
