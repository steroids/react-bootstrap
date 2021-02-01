import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IRadioListFieldViewProps} from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import {ReactText} from 'react';

@bem('RadioListFieldView')
export default class RadioListFieldView extends React.Component<IRadioListFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                {this.props.items.map(item => (
                    <div
                        key={item.id as ReactText}
                        className='custom-control custom-radio'
                    >
                        <input
                            {...this.props.inputProps}
                            id={this.props.fieldId + '_' + item.id}
                            className={bem(
                                bem.element('input'),
                                'custom-control-input',
                                this.props.isInvalid && 'is-invalid',
                            )}
                            checked={item.isSelected}
                            disabled={this.props.disabled}
                            onChange={() => this.props.onItemClick(item)}
                        />
                        <label
                            className='custom-control-label'
                            htmlFor={this.props.fieldId + '_' + item.id}
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        );
    }

}
