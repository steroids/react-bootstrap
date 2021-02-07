import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavButtonView(props: INavViewProps & IBemHocOutput) {
    const bem = useBem('NavButtonView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <div className={bem(props.children && 'mb-3', bem.element('nav'))}>
                {props.items.map((item, index) => (
                    <Button
                        key={item.id || index}
                        color='secondary'
                        outline={!item.isActive}
                        onClick={() => props.onClick(item, index)}
                        className={bem.element('nav-item')}
                        {...item}
                    />
                ))}
            </div>
            <div className={bem.element('content')}>
                {props.children}
            </div>
        </div>
    );
}
