import React from 'react';
import PropTypes from 'prop-types';

export default class DefaultFormatter extends React.PureComponent {

    static propTypes = {
        value: PropTypes.any,
    };

    render() {
        return this.props.value || this.props.children || null;
    }
}