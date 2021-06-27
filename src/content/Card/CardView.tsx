import React, {useState, isValidElement} from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { ICardViewProps } from '@steroidsjs/core/ui/content/Card/Card'

import './CardView.scss';

export default function CardView (props: ICardViewProps) {
    const bem = useBem('CardView');

    return(
        <div className={bem.block({
            [`large`]: props.size === 'large',
            [`medium`]: props.size === 'medium',
            [`small`]: props.size === 'small',
            [`square`]: props.shape === 'square',
            [`circle`]: props.shape === 'circle',
            [`border`]: props.bordered,
        })}>
            <div className={bem.element('title')}>
                {props.title}
            </div>
            <div className={bem.element('content')} >
                {props.children}
            </div>

        </div>
    )
}