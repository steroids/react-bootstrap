import {useBem} from '@steroidsjs/core/hooks';
import Button from '@steroidsjs/core/ui/form/Button';
import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import * as React from 'react';

export default function PaginationMoreView(props: IPaginationViewProps) {
    const bem = useBem('PaginationMoreView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <Button
                color='secondary'
                outline
                label={__('Загрузить еще...')}
                {...props.buttonProps}
                onClick={props.onSelectNext}
            />
        </div>
    );
}
