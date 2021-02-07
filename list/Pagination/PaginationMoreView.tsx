import * as React from 'react';

import Button from '@steroidsjs/core/ui/form/Button';
import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {useBem} from '@steroidsjs/core/hooks';

export default function PaginationMoreView(props: IPaginationViewProps & IBemHocOutput) {
    const bem = useBem('PaginationMoreView');
    return (
        <div className={bem('text-center', bem.block(), props.className)}>
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
