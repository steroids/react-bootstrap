import * as React from 'react';
import _get from 'lodash-es/get';

import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ISwitcherFieldViewProps} from '@steroidsjs/core/ui/form/SwitcherField/SwitcherField';
import {useBem} from '@steroidsjs/core/hooks';

export default function SwitcherFieldView(props: ISwitcherFieldViewProps & IBemHocOutput) {
    const bem = useBem('SwitcherFieldView');
    return (
        <div
            className={bem(
                bem.block({
                    size: props.size,
                }),
                props.className,
                'btn-group',
            )}
        >
            {props.items.map(item => (
                <Button
                    key={String(item[props.primaryKey])}
                    {...props.buttonProps}
                    className={bem(
                        _get(props, 'buttonProps.className'),
                        props.hoveredId === item[props.primaryKey] && 'hover',
                        props.selectedIds.includes(item[props.primaryKey]) && 'active',
                    )}
                    disabled={props.disabled}
                    onClick={() => props.onItemSelect(item[props.primaryKey])}
                    onMouseOver={() => props.onItemHover(item[props.primaryKey])}
                    layout={false}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
}
