import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import Button from '@steroidsjs/core/ui/form/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';

@bem('NavIconView')
export default class NavIconView extends React.Component<INavViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem(bem.block(), this.props.className)}>
                {this.props.items.map((item, index) => (
                    <Button
                        key={item.id || index}
                        link
                        onClick={() => this.props.onClick(item, index)}
                        {...item}
                        label={null}
                        hint={item.hint || item.label || null}
                    />
                ))}
                {this.props.children}
            </div>
        );
    }

}