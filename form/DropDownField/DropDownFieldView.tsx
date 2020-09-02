import * as React from 'react';
import {ReactText} from 'react';
import {findDOMNode} from 'react-dom';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';

@bem('DropDownFieldView')
export default class DropDownFieldView extends React.PureComponent<IDropDownFieldViewProps & IBemHocOutput> {

    static defaultProps = {
        searchAutoFocus: true,
    };

    componentDidUpdate(prevProps) {
        // Auto focus on search
        if (this.props.searchAutoFocus && this.props.autoComplete && !prevProps.isOpened && this.props.isOpened) {
            const input = findDOMNode(this).querySelector('.' + this.props.bem.element('search-input'));
            if (input) {
                input.focus();
            }
        }
    }

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block({size: this.props.size})}>
                <div
                    className={bem.element('selected-items', {
                        reset: this.props.showReset,
                        'is-invalid': this.props.isInvalid,
                    })}
                    onClick={this.props.onOpen}
                >
                    {this.props.selectedItems.length === 0 && (
                        <span className={bem.element('placeholder')}>
                            {this.props.placeholder || <>&nbsp;</>}
                        </span>
                    )}
                    {this.props.selectedItems.map(item => (
                        <span key={item.id as ReactText}>
                            {item.label} &nbsp;
                        </span>
                    ))}
                </div>
                {this.props.showReset && !!this.props.selectedItems.length && (
                    <span
                        className={bem.element('reset')}
                        onClick={this.props.onReset}
                    />
                )}
                {this.props.isOpened && (
                    <div className={bem.element('drop-down')}>
                        {this.props.autoComplete.enable && (
                            <div className={bem.element('search')}>
                                <input
                                    {...this.props.searchInputProps}
                                    onChange={e => this.props.searchInputProps.onChange(e.target.value)}
                                    className={bem(
                                        'form-control',
                                        'form-control-' + this.props.size,
                                        bem.element('search-input'),
                                        this.props.searchInputProps.className,
                                    )}
                                />
                            </div>
                        )}
                        <div className={bem.element('drop-down-list')}>
                            {this.props.items.map(item => (
                                <div
                                    key={item.id as ReactText}
                                    className={bem.element('drop-down-item', {hover: item.isHovered, select: item.isSelected})}
                                    onClick={() => this.props.onItemClick(item)}
                                    onMouseOver={() => this.props.onItemMouseOver(item)}
                                >

                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
