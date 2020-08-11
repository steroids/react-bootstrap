import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Link from '@steroidsjs/core/ui/nav/Link';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITreeViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';

@bem('TreeView')
export default class TreeView extends React.Component<ITreeViewProps & IBemHocOutput> {

    static defaultProps = {
        levelPadding: 20,
    };

    render() {
        const bem = this.props.bem;
        return (
            <ul className={bem(bem.block(), this.props.className)}>
                {this.props.items.map(item => (
                    <li
                        key={item.uniqId}
                        onClick={item.onClick}
                        className={bem(
                            bem.element('item', {
                                selected: item.isSelected,
                                opened: item.isOpened,
                                'has-items': item.hasItems,
                            }),
                            item.className
                        )}
                    >
                        <Link
                            className={bem.element('item-label')}
                            style={{
                                paddingLeft: String(item.level * this.props.levelPadding) + 'px',
                            }}
                            {...item}
                        />
                    </li>
                ))}
            </ul>
        );
    }

}