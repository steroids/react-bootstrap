import * as React from 'react';
import {Collapse} from 'react-collapse';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IAccordionViewProps} from '@steroidsjs/core/ui/list/Accordion/Accordion';
import Icon from '@steroidsjs/core/ui/icon/Icon';

@bem('AccordionView')
export default class AccordionView extends React.Component<IAccordionViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                {this.props.items.map(item => (
                    <div
                        key={item.id}
                        className={bem(bem.element('item', {opened: item.isOpened}), 'card mb-3')}
                    >
                        <div
                            className={bem(bem.element('header'), 'card-header')}
                            onClick={() => this.props.onToggle(item)}
                        >
                            {this.props.renderHeader(item)}
                            <Icon
                                className={bem.element('header-icon')}
                                name={item.isOpened ? 'chevron-up' : 'chevron-down'}
                            />
                        </div>
                        <Collapse isOpened={item.isOpened}>
                            <div className={bem(bem.element('content'), 'card-body')}>
                                {this.props.renderItem(item)}
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        );
    }
}
