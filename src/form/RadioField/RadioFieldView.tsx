import {useBem} from '@steroidsjs/core/hooks';

import useUniqueId from '@steroidsjs/core/hooks/useUniqueId';
import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';

export default function RadioFieldView(props: ICheckboxFieldViewProps) {
    const bem = useBem('RadioFieldView');
    const id = useUniqueId('radio');

    return (
        <div
            className={bem(
                bem.block({
                    hasError: !!props.errors,
                    size: props.size,
                }),
                props.className,
            )}
            onClick={props.onChange}
        >
            <input
                className={bem(
                    bem.element('input', {
                        checked: props.checked,
                    }),
                )}
                id={props.id || id}
                {...props.inputProps}
                required={props.required}
            />
            <label
                className={bem.element('label')}
                htmlFor={props.id || id}
            >
                <span className={bem.element('ellipse')} />
                {props.label}
            </label>
        </div>
    );
}
