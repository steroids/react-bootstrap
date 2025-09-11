import CheckboxField from '@steroidsjs/core/ui/form/CheckboxField';
import {ICheckboxColumnViewProps} from '@steroidsjs/core/ui/list/CheckboxColumn/CheckboxColumn';
import {useBem} from '@steroidsjs/core/hooks';
import _get from 'lodash-es/get';

export default function CheckboxColumnView(props: ICheckboxColumnViewProps) {
    const bem = useBem('CheckboxColumnView');
    const CheckboxFieldInternal = CheckboxField.WrappedComponent;

    return (
        <div className={bem.block()}>
            <CheckboxFieldInternal
                {...props.fieldProps}
                input={props.input}
                size={props.size}
                label={_get(props.item, props.attribute)}
            />
        </div>
    );
}
