import * as React from 'react';
import _get from 'lodash-es/get';

import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISwitcherFieldViewProps} from '@steroidsjs/core/ui/form/SwitcherField/SwitcherField';
import {useBem} from '@steroidsjs/core/hooks';

export default function SwitcherFieldView(props: ISwitcherFieldViewProps & IBemHocOutput) {
    const bem = useBem('SwitcherFieldView');
    return (
        <div className={bem(
            bem.block({
                size: props.size,
            }),
            props.className,
            'btn-group',
        )}>
            {props.items.map(item => (
                <Button
                    key={item.id}
                    {...props.buttonProps}
                    className={bem(
                        _get(props, 'buttonProps.className'),
                        item.isSelected && 'active',
                    )}
                    disabled={props.disabled}
                    onClick={() => props.onItemClick(item)}
                    layout={false}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
}
