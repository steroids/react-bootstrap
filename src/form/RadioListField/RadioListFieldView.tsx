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
                key: radioIndex,
                id: `${prefix}_${radio.id}`,
                label: radio.label,
                inputProps: {
                    name: `${prefix}_${radio.id}`,
                    type: 'radio',
                    checked: props.selectedIds.includes(radio.id),
                    onChange: () => {
                        props.onItemSelect(radio.id);
                    },
                    disabled: props.disabled,
                },
                size: props.size,
            }))}
        </div>
    );
}
