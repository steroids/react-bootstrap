import * as React from 'react';
import {ReactText} from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IAutoCompleteFieldViewProps} from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';

@bem('AutoCompleteFieldView')
export default class AutoCompleteFieldView extends React.PureComponent<IAutoCompleteFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block({size: this.props.size})}>
                <input
                    {...this.props.inputProps}
                    className={bem(
                        bem.block({
                            size: this.props.size,
                        }),
                        'form-control',
                        'form-control-' + this.props.size,
                        this.props.isInvalid && 'is-invalid',
                        this.props.inputProps.className,
                        this.props.className
                    )}
                    onChange={e => this.props.input.onChange(e.target.value)}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    required={this.props.required}
                />
                {this.props.isOpened && (
                    <div className={bem.element('drop-down')}>
                        <div className={bem.element('drop-down-list')}>
                            {this.props.items.map(item => (
                                <div
                                    key={item.id as ReactText}
                                    className={bem.element('drop-down-item', {hover: item.isHovered, select: item.isSelected})}
                                    onClick={() => this.props.onItemClick(item)}
                                    onMouseOver={() => this.props.onItemMouseOver(item)}
                                >
                                    {item.labelHighlighted && (
                                        item.labelHighlighted.map((item, index) => (
                                            item[1]
                                                ? <b key={index}>{item[0]}</b>
                                                : <span key={index}>{item[0]}</span>
                                        ))
                                    ) || item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
