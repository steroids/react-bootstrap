import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';

@bem('PaginationMoreView')
export default class PaginationMoreView extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        buttonProps: PropTypes.object,
        onSelectNext: PropTypes.func,
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), 'text-center my-4')}>
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
