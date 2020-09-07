import * as React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {ITooltipProps} from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

import './TooltipView.scss';

@bem('Tooltip')
export default class TooltipView extends React.PureComponent<ITooltipProps & IBemHocOutput> {

    tooltipRef: React.RefObject<any>;
    arrowRef: React.RefObject<any>;

    constructor(props) {
        super(props);
        this.tooltipRef = React.createRef();
        this.arrowRef = React.createRef();
    }

    componentDidMount(): void {
        this.props.calculatePosition(
            this.tooltipRef.current.getBoundingClientRect(),
            this.arrowRef.current.getBoundingClientRect()
        );
    }

    render() {
        const bem = this.props.bem;
        return (
            <div
                ref={this.tooltipRef}
                className={bem(
                    bem.block({
                        ['position-'+this.props.position]: true
                    })
                )}
                style={this.props.style}
            >
                <div
                    className={bem.element('body',
                        {
                            'show': this.props.isTooltipVisible
                        }
                    )}
                >
                    <div
                        ref={this.arrowRef}
                        className={bem.element(
                            'arrow',
                            {['position-'+this.props.position]: true},
                        )}
                        style={this.props.arrowPosition}
                    />
                    <div className={bem.element('content')}>
                        <span>{this.props.content}</span>
                    </div>
                </div>
            </div>
        );
    }
}
