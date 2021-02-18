import * as React from 'react';

import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function PaginationButtonView(props: IPaginationViewProps & IBemHocOutput) {
    const bem = useBem('PaginationButtonView');
    return (
        <ul
            className={bem(
                props.className,
                bem.block(),
                'flex-row',
                'pagination',
                `pagination-${props.size}`,
            )}
        >
            {props.pages.map((item, index) => (
                <li
                    key={index}
                    className={bem(
                        bem.element('page', {hidden: !item.page}),
                        'page-item',
                        item.isActive ? 'active' : '',
                    )}
                >
                    <button
                        className={bem(
                            bem.element('page-link', {hidden: !item.page}),
                            'page-link',
                        )}
                        onClick={e => {
                            e.preventDefault();
                            props.onSelect(item.page);
                        }}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}
