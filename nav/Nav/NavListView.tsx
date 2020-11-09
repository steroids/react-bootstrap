import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Link from '@steroidsjs/core/ui/nav/Link';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';

@bem('NavListView')
export default class NavListView extends React.Component<INavViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <ul className={bem('nav flex-column', bem.block(), this.props.className)}>
                {this.renderItems(this.props.items)}
                {this.props.children}
            </ul>
        );
    }

    renderItems(items) {
        const bem = this.props.bem;
        if (!items || items.length === 0) {
            return null;
        }
        return items.map((item, index) => (
            <li
                key={index}
                className={bem('nav-item', bem.element('item'), this.props.navClassName)}
            >
                <Link
                    onClick={() => this.props.onClick(item, index)}
                    layout={false}
                    {...item}
                    key={item.id || index}
                    className={bem(
                        item.isActive && 'active',
                        bem.element('item-link'),
                        item.className,
                    )}
                />
                {item.items && item.items.length > 0 && (
                    <ul className={bem('nav flex-column', bem.element('sub-list'))}>
                        {this.renderItems(item.items)}
                    </ul>
                )}
            </li>
        ));
    }

}
