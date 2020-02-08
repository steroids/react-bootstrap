import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {Link} from '@steroidsjs/core/ui/nav';
import {INavBarViewProps} from '@steroidsjs/core/ui/nav/NavBar/NavBar';

@bem('NavBarView')
export default class NavBarView extends React.Component<INavBarViewProps> {

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
                        {this.props.logo.imageUrl && (
                            <img
                                src={this.props.logo.imageUrl}
                                alt={this.props.logo.title || ''}
                            />
                        )}
                        {this.props.logo.title || ''}
                    </Link>
                )}
                {this.props.children}
            </nav>
        );
    }

}