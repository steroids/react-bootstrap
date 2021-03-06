import * as React from 'react';

import {IPaginationSizeViewProps} from '@steroidsjs/core/ui/list/PaginationSize/PaginationSize';
import {useBem} from '@steroidsjs/core/hooks';

export default function PaginationSizeView(props: IPaginationSizeViewProps) {
    const bem = useBem('PaginationSizeView');
    return (
        <div className={bem(props.className, bem.block())}>
            <ul
                className={bem(
                    bem.element('sizes'),
                    'pagination',
                    `pagination-${props.size}`,
                )}
            >
                {props.items.map((item, index) => (
                    <li
                        key={index}
                        className={bem(
                            bem.element('sizes-item', {active: item.isActive}),
                            'page-item',
                            item.isActive && 'active',
                        )}
                    >
                        <button
                            className={bem(
                                bem.element('link'),
                                'page-link',
                            )}
                            onClick={e => {
                                e.preventDefault();
                                props.onSelect(item.size);
                            }}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
