import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('PaginationMoreView')
export default class PaginationMoreView extends React.Component<IPaginationViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem('text-center', bem.block(), this.props.className)}>
                <Button
                    color='secondary'
                    outline
                    label={__('Загрузить еще...')}
                    {...this.props.buttonProps}
                    onClick={this.props.onSelectNext}
                />
            </div>
        );
    }

}
