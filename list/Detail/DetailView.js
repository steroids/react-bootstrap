import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';

@bem('DetailView')
export default class DetailView extends React.PureComponent {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            attribute: PropTypes.string,
            label: PropTypes.any,
            value: PropTypes.any,
        })),
        renderHeader: PropTypes.func,
        renderItem: PropTypes.func,
        openedId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        onToggle: PropTypes.func,
    };

    render() {
        const bem = this.props.bem;
        return (
            <table className={bem('table table-bordered', bem.block(), this.props.className)}>
                <tbody>
                    {this.props.items.map(item => (
                        <tr
                            key={item.attribute}
                            className={bem.element('item')}
                        >
                            <th className={bem.element('item-label')}>
                                {item.label}
                            </th>
                            <td className={bem.element('item-value')}>
                                {item.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

}
