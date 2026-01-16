import {useBem} from '@steroidsjs/core/hooks';
import {IPaginationSizeViewProps} from '@steroidsjs/core/ui/list/PaginationSize/PaginationSize';
import ButtonGroup from '@steroidsjs/core/ui/nav/ButtonGroup';
import * as React from 'react';

export default function PaginationSizeView(props: IPaginationSizeViewProps) {
    const bem = useBem('PaginationSizeView');

    return (
        <div className={bem(props.className, bem.block())}>
            <ButtonGroup
                items={props.items}
                onClick={props.onSelect}
                activeButton={props.defaultValue}
                buttonProps={props.buttonProps}
            />
        </div>
    );
}
