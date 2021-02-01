import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFieldListItemViewProps} from '@steroidsjs/core/ui/form/FieldList/FieldList';

@bem('FieldListItemView')
export default class FieldListItemView extends React.Component<IFieldListItemViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <tr>
                {this.props.items.map((field, index) => (
                    <td
                        key={index}
                        className={bem(
                            bem.element('table-cell'),
                            field.className
                        )}
                    >
                        {this.props.renderField(field, this.props.prefix)}
                    </td>
                ))}
                {this.props.showRemove && (
                    <td className={bem.element('table-cell', 'remove')}>
                        {(!this.props.required || this.props.rowIndex > 0) && (
                            <div
                                className={bem.element('remove')}
                                onClick={() => this.props.onRemove(this.props.rowIndex)}
                            >
                                &times;
                            </div>
                        )}
                    </td>
                )}
            </tr>
        );
    }

}
