import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';

@bem('NavLinkView')
export default class NavLinkView extends React.Component<INavViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <div className={bem.element('nav mb-3')}>
                    {this.props.items.map((item, index) => (
                        <Button
                            key={index}
                            link
                            onClick={() => this.props.onClick(item, index)}
                            className={bem.element('nav-item')}
                            {...item}
                        />
                    ))}
                </div>
                <div className={bem.element('content')}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
