import * as React from 'react';
import {Collapse} from 'react-collapse';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IAccordionViewProps} from '@steroidsjs/core/ui/list/Accordion/Accordion';

@bem('AccordionView')
export default class AccordionView extends React.PureComponent<IAccordionViewProps & IBemHocOutput> {

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
                            <span className={bem(bem.element('header-icon'), 'material-icons')}>
                                {item.isOpened ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                            </span>
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
