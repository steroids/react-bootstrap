import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';

import {IRadioListFieldViewProps} from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';

export default function RadioListFieldView(props: IRadioListFieldViewProps) {
    const bem = useBem('RadioListFieldView');
    const prefix = useUniqueId('radio');

    return (
        <div className={bem(
            bem.block({
                [`${props.orientation}`]: !!props.orientation,
            }),
            props.className,
        )}
        >
            {props.items.map((radio, radioIndex) => props.renderRadio({
                inputProps: {
                    name: `${prefix}_${radio.id}`,
                    checked: null,
                    type: 'radio',
                    disabled: false,
                    onChange: () => {
                        props.onItemSelect(radio.id);
                    },
                },
                disabled: props.disabled,
                checked: props.selectedIds.includes(radio.id),
                label: radio.label,
                id: `${prefix}_${radio.id}`,
                key: radioIndex,
                size: props.size,
            }))}
        </div>
    );
}
