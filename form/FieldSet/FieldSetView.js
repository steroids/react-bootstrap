import * as React from 'react';

export default class FieldSetView extends React.PureComponent {
    render() {
        return (
            <fieldset className={this.props.className}>
                <legend>{this.props.label}</legend>
                {this.props.children}
            </fieldset>
        );
    }
}