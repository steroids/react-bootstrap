import * as React from 'react';
import {IBooleanFormatterPropsView} from '@steroidsjs/core/ui/format/BooleanFormatter/BooleanFormatter';

export default class BooleanFormatterView extends React.PureComponent<IBooleanFormatterPropsView> {

    render() {
        return this.props.value ? __('Да') : __('Нет');
    }
}
