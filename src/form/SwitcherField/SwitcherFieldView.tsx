import {useCallback} from 'react';
import _isPlainObject from 'lodash-es/isPlainObject';
import {ISwitcherFieldViewProps, ISwitcherItem} from '@steroidsjs/core/ui/form/SwitcherField/SwitcherField';
import {useBem, useUniqueId} from '@steroidsjs/core/hooks';

export default function SwitcherFieldView(props: ISwitcherFieldViewProps) {
    const bem = useBem('SwitcherFieldView');
    const prefix = useUniqueId('switcher');

    const renderLabel = useCallback((item: ISwitcherItem) => {
        if (typeof item.label === 'object') {
            return props.selectedIds.includes(item.id) ? item.label.checked : item.label.unchecked;
        }

        return item.label;
    }, [props.selectedIds]);

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            {props.items.map((switcher, switcherIndex) => (
                <label
                    key={switcherIndex}
                    className={bem.element('switcher', {
                        size: props.size,
                    })}
                    htmlFor={`${prefix}_${switcher.id}`}
                >
                    <input
                        {...props.inputProps}
                        id={`${prefix}_${switcher.id}`}
                        onChange={() => props.onItemSelect(switcher.id)}
                        checked={props.selectedIds.includes(switcher.id)}
                        className={bem.element('input')}
                        required={switcher.required}
                    />
                    <span className={bem.element('slider')} />
                    <span className={bem.element('label')}>{renderLabel(switcher)}</span>
                </label>
            ))}
        </div>
    );
}
