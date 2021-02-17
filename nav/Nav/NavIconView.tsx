import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavIconView(props: INavViewProps & IBemHocOutput) {
    const bem = useBem('NavIconView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.items.map((item, index) => (
                <Button
                    key={item.id || index}
                    link
                    onClick={() => props.onClick(item, index)}
                    {...item}
                    label={null}
                    hint={item.hint || item.label || null}
                />
            ))}
            {props.children}
        </div>
    );
}
