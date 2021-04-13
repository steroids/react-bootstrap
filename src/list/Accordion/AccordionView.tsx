import * as React from 'react';
import {Collapse} from 'react-collapse';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IAccordionViewProps} from '@steroidsjs/core/ui/list/Accordion/Accordion';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function AccordionView(props: IAccordionViewProps & IBemHocOutput) {
    const bem = useBem('AccordionView');
    return (
        <div className={bem.block()}>
            {props.items.map(item => (
                <div
                    key={item.id}
                    className={bem(bem.element('item', {opened: item.isOpened}), 'card mb-3')}
                >
                    <div
                        className={bem(bem.element('header'), 'card-header')}
                        onClick={() => props.onToggle(item)}
                        onKeyPress={() => props.onToggle(item)}
                        role='button'
                        tabIndex={0}
                    >
                        {props.renderHeader(item)}
                        <Icon
                            className={bem.element('header-icon')}
                            name={item.isOpened ? 'chevron-up' : 'chevron-down'}
                        />
                    </div>
                    <Collapse isOpened={item.isOpened}>
                        <div className={bem(bem.element('content'), 'card-body')}>
                            {props.renderItem(item)}
                        </div>
                    </Collapse>
                </div>
            ))}
        </div>
    );
}
