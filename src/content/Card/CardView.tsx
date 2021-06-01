import React, {useState, isValidElement} from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { ICardViewProps } from '@steroidsjs/core/ui/content/Card/Card'

import './CardView.scss';

export default function CardView (props: ICardViewProps) {
    const bem = useBem('CardView');

    return(
        <div 
            className={bem(bem.block({
                [`${props.orientation}`]: !!props.orientation,
                [`${props.shape}`]: !!props.shape,
                [`${props.cardStyle}`]: !!props.cardStyle,
                [`border_${props.borderStyle}`]: props.borderStyle !== false,
            }), props.className)}
            style={props.style}
        >   
                {props.header && (
                    <div className={bem.element('header')}>
                        {props.header}
                    </div>
                )}
                {props.cover && (
                    <div className={bem.element('cover')}>
                        <img src={props.cover} alt='cover-img' />
                    </div>
                )}
                <div className={bem.element('content')} >
                    {props.title && (
                        <div className={bem.element('title')}>
                            {props.title}
                        </div>
                    )}
                    {props.description && (
                        <div className={bem.element('description')} >
                            {props.description}
                        </div>
                    )}
                    {props.children}
                </div>
                {props.footer && (
                    <div className={bem.element('footer')}>
                        {props.footer}
                    </div>
                )}        
        </div>
    )
}