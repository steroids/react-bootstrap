import * as React from 'react';
import {IFieldSetViewProps} from '@steroidsjs/core/ui/form/FieldSet/FieldSet';

export default class FieldSetView extends React.Component<IFieldSetViewProps> {
    render() {
        return (
            <fieldset className={this.props.className}>
                <legend>{this.props.label}</legend>
                {this.props.children}
            </fieldset>
        );
    }
}