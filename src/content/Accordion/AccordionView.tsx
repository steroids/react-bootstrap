import {useBem} from '@steroidsjs/core/hooks';
import {IAccordionViewProps} from '@steroidsjs/core/ui/content/Accordion/Accordion';
import * as React from 'react';

export default function AccordionView(props: IAccordionViewProps) {
    const bem = useBem('AccordionView');
    return (
        <div className={bem(bem.block(), props.className)}>
            {props.children}
        </div>
    );
}
