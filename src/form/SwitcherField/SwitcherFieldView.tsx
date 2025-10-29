import {useBem, useUniqueId} from '@steroidsjs/core/hooks';

import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {CSSProperties, useCallback} from 'react';

export default function SwitcherFieldView(props: ICheckboxFieldViewProps) {
    const bem = useBem('SwitcherFieldView');
    const uniqueId = useUniqueId('switcher');

    const renderLabel = useCallback(() => {
        if (typeof props.label === 'object') {
            return props.inputProps.checked ? props.label.checked : props.label.unchecked;
        }

        return props.label;
    }, [props.inputProps.checked, props.label]);

    const customVariableColorStyle = {'--checkbox-custom-color': props.color} as CSSProperties;

    return (
        <div
            className={bem(
                bem.block({
                    size: props.size,
                    hasErrors: !!props.errors,
                }),
                props.className,
            )}
            style={{
                ...props.style,
                ...customVariableColorStyle,
            }}
            onClick={props.onChange}
        >
            <input
                id={props.id || uniqueId}
                disabled={props.disabled}
                required={props.required}
                onChange={() => props.onItemSelect(props.id)}
                className={bem.element('input')}
                {...props.inputProps}
            />
            <span className={bem.element('slider')} />
            <span className={bem.element('label')}>{renderLabel()}</span>
        </div>
    );
}
