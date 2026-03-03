import {Text} from '@steroidsjs/core/ui/typography';
import React from 'react';

interface ILabelProps {
    content: string,
    className: string,
}

export default function Label(props: ILabelProps) {
    return (
        <Text
            className={props.className}
            type='body2'
            content={props.content}
            color="light-dark"
        />
    );
}
