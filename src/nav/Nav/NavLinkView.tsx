import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import {useBem} from '@steroidsjs/core/hooks';

export default function NavLinkView(props: INavViewProps & IBemHocOutput) {
    const bem = useBem('NavLinkView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <div className={bem.element('nav mb-3')}>
                {props.items.map((item, index) => (
                    <Button
                        key={item.id || index}
                        link
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
