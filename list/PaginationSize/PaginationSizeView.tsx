import * as React from 'react';

import {IPaginationSizeViewProps} from '@steroidsjs/core/ui/list/PaginationSize/PaginationSize';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function PaginationSizeView(props: IPaginationSizeViewProps & IBemHocOutput) {
    const bem = useBem('PaginationSizeView');
    return (
        <div className={bem(props.className, bem.block())}>
            <ul className={bem(
                bem.element('sizes'),
                'pagination',
                `pagination-${props.size}`
            )}>
                {props.items.map((item, index) => (
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
                                props.onSelect(item.size);
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
