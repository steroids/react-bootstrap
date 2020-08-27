import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {Link} from '@steroidsjs/core/ui/nav';
import {IHeaderViewProps} from '@steroidsjs/core/ui/layout/Header/Header';
import Nav from '@steroidsjs/core/ui/nav/Nav';
import Icon from '@steroidsjs/core/ui/icon/Icon';

@bem('HeaderView')
export default class HeaderView extends React.Component<IHeaderViewProps> {

    render() {
        const bem = this.props.bem;
        return (
            <nav
                className={bem(
                    'navbar navbar-expand-lg',
                    this.props.dark ? 'navbar-dark' : 'navbar-light',
                    this.props.dark ? 'bg-dark' : 'bg-light',
                    bem.block(),
                    this.props.className,
                )}
            >
                {this.props.logo && (
                    <Link
                        className={bem('navbar-brand', bem.element('logo'))}
                        toRoute='root'
                        {...this.props.logo.linkProps}
                    >
                        {this.props.logo.icon && (
                            <Icon
                                className={bem.element('logo-image')}
                                name={this.props.logo.icon}
                                title={this.props.logo.title}
                            />
                        )}
                        {this.props.logo.title || ''}
                    </Link>
                )}
                {this.props.nav && (
                    <Nav
                        layout='navbar'
                        {...this.props.nav}
                    />
                )}
                {this.props.children}
            </nav>
        );
    }

}
