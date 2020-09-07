import * as React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {ITooltipViewProps} from '@steroidsjs/core/ui/layout/Tooltip/Tooltip';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

import './TooltipView.scss';

@bem('Tooltip')
export default class TooltipView extends React.PureComponent<ITooltipViewProps & IBemHocOutput> {

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
                        'show': this.props.isTooltipVisible
                    }),
                    'tooltip',
                    'tooltip-position-'+this.props.position
                )}
                style={this.props.style}
            >
                <div
                    ref={this.arrowRef}
                    className={bem(
                        bem.element(
                            'arrow',
                            {['position-'+this.props.position]: true},
                        )
                    )}
                    style={this.props.arrowPosition}
                />
                <div
                    className={bem(
                        bem.element('content'),
                        'tooltip-inner'
                    )}
                >
                    <span>{this.props.content}</span>
                </div>
            </div>
        );
    }
}
