import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('NavLinkView')
export default class NavLinkView extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                <div className={bem.element('nav mb-3')}>
                    {this.props.items.map((item, index) => (
                        <Button
                            key={item.id || index}
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
