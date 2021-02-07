import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IDetailViewProps} from '@steroidsjs/core/ui/list/Detail/Detail';
import {useBem} from '@steroidsjs/core/hooks';

export default function DetailView(props: IDetailViewProps & IBemHocOutput) {
    const bem = useBem('DetailView');
    return (
        <table className={bem('table table-bordered', bem.block(), props.className)}>
            <tbody>
                {props.items.map((item , index) => (
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
