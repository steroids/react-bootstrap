import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';

@bem('NavBarView')
export default class NavBarView extends React.Component<INavViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div
                className={bem(
                    'navbar-expand-lg navbar-nav',
                    this.props.dark && 'navbar-dark bg-dark',
                    bem.block(),
                    this.props.className
                )}
            >
                <div className='navbar-nav px-3'>
                    {this.props.items.map((item, index) => (
                        <li
                            key={index}
                            className={bem(
                                'nav-item text-nowrap',
                                item.isActive && 'active'
                            )}
                        >
                            <Button
                                link
                                className={bem(
                                    'nav-link',
                                    item.isActive && 'active',
                                )}
                                onClick={() => this.props.onClick(item, index)}
                                {...item}
                            />
                        </li>
                    ))}
                </div>
                {this.props.children}
            </div>
        );
    }

}