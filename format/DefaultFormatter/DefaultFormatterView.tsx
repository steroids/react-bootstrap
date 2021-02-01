import * as React from 'react';
import {IBooleanFormatterPropsView} from '@steroidsjs/core/ui/format/BooleanFormatter/BooleanFormatter';

export default class DefaultFormatterView extends React.Component<IBooleanFormatterPropsView> {

    render() {
        return this.props.value || this.props.children || null;
    }
}