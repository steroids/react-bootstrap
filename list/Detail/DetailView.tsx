import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDetailViewProps} from '@steroidsjs/core/ui/list/Detail/Detail';

@bem('DetailView')
export default class DetailView extends React.PureComponent<IDetailViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <table className={bem('table table-bordered', bem.block(), this.props.className)}>
                <tbody>
                    {this.props.items.map((item , index) => (
                        <tr
                            key={item.attribute || index}
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
