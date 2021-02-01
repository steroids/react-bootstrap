import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IPaginationSizeViewProps} from '@steroidsjs/core/ui/list/PaginationSize/PaginationSize';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('PaginationSizeView')
export default class PaginationSizeView extends React.Component<IPaginationSizeViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(this.props.className, bem.block())}>
                <ul className={bem(
                    bem.element('sizes'),
                    'pagination',
                    `pagination-${this.props.size}`
                )}>
                    {this.props.items.map((item, index) => (
                        <li
                            key={index}
                            className={bem(
                                bem.element(
                                    'sizes-item', {
                                        active: item.isActive
                                    }),
                                'page-item',
                                item.isActive && 'active'
                            )}
                        >
                            <a
                                className={bem(
                                    bem.element('link'),
                                    'page-link'
                                )}
                                href='#'
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.onSelect(item.size);
                                }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}
