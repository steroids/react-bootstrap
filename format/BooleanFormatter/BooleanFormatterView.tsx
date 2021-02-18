import {IBooleanFormatterPropsView} from '@steroidsjs/core/ui/format/BooleanFormatter/BooleanFormatter';

export default function BooleanFormatterView(props: IBooleanFormatterPropsView) {
    return props.value ? __('Да') : __('Нет');
}
