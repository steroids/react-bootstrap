import * as React from 'react';
import {IBooleanFormatterPropsView} from '@steroidsjs/core/ui/format/BooleanFormatter/BooleanFormatter';

export default function DefaultFormatterView(props: IBooleanFormatterPropsView) {
    return props.value || props.children || null;
}