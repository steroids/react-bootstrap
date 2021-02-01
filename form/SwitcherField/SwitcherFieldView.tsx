import * as React from 'react';
import _get from 'lodash-es/get';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISwitcherFieldViewProps} from '@steroidsjs/core/ui/form/SwitcherField/SwitcherField';

@bem('SwitcherFieldView')
export default class SwitcherFieldView extends React.Component<ISwitcherFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(
                bem.block({
                    size: this.props.size,
                }),
                this.props.className,
                'btn-group',
            )}>
                {this.props.items.map(item => (
                    <Button
                        key={item.id}
                        {...this.props.buttonProps}
                        className={bem(
                            _get(this.props, 'buttonProps.className'),
                            item.isSelected && 'active',
                        )}
                        disabled={this.props.disabled}
                        onClick={() => this.props.onItemClick(item)}
                        layout={false}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
        );
    }

}
