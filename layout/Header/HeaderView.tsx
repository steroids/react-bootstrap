import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {Link} from '@steroidsjs/core/ui/nav';
import {IHeaderViewProps} from '@steroidsjs/core/ui/layout/Header/Header';
import Nav from '@steroidsjs/core/ui/nav/Nav';

@bem('HeaderView')
export default class HeaderView extends React.Component<IHeaderViewProps> {

    render() {
        const bem = this.props.bem;
        return (
            <nav className={bem('navbar', bem.block(), this.props.className)}>
                {this.props.logo && (
                    <Link
                        className={bem('navbar-brand', bem.element('logo'))}
                        toRoute='root'
                        {...this.props.logo.linkProps}
                    >
                        {this.props.logo.logoUrl && (
                            <img
                                className={bem.element('logo-image')}
                                src={this.props.logo.logoUrl}
                                alt={this.props.logo.title || ''}
                            />
                        )}
                        {this.props.logo.title || ''}
                    </Link>
                )}
                {this.props.nav && (
                    <Nav {...this.props.nav}/>
                )}
                {this.props.children}
            </nav>
        );
    }

}
