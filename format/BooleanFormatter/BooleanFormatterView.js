import * as React from 'react';
import PropTypes from 'prop-types';

export default class BooleanFormatterView extends React.PureComponent {

    static propTypes = {
        value: PropTypes.any,
    };

    render() {
        return this.props.value ? __('Да') : __('Нет');
    }
}
