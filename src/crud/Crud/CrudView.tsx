import * as React from 'react';
import Controls from '@steroidsjs/core/ui/nav/Controls';

import {ICrudViewProps} from '@steroidsjs/core/ui/crud/Crud/Crud';
import {useBem} from '@steroidsjs/core/hooks';

export default function CrudView(props: ICrudViewProps) {
    const bem = useBem('CrudView');

    return (
        <div className={bem(bem.block(), props.className)}>
            {props.title && (
                <h1 className='mb-3'>
                    {props.title}
                </h1>
            )}
            {props.controls && (
                <Controls
                    items={props.controls}
                    className={bem.element('controls')}
                />
            )}
            {props.children}
        </div>
    );
}
