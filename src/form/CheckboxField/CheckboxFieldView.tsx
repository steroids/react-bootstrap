import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import {useBem} from '@steroidsjs/core/hooks';
import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';
import {CSSProperties} from 'react';

export default function CheckboxFieldView(props: ICheckboxFieldViewProps) {
    const bem = useBem('CheckboxFieldView');
    const id = useUniqueId('checkbox');

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
                className={bem.element('input', {
                    hasCustomColor: !!props.color,
                })}
                id={props.id || id}
                disabled={props.disabled}
                required={props.required}
                {...props.inputProps}
            />
            <label
                className={bem.element('label', {
                    'has-label-only': props.hasOnlyLeafCheckboxes && !props.id,
                })}
                htmlFor={props.id || id}
            >
                {props.label && (
                    <span className={bem.element('label-text', {required: props.required})}>
                        {props.label}
                    </span>
                )}
            </label>
        </div>
    );
}
