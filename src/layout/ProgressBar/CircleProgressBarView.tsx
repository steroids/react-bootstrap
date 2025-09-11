import {IProgressBarViewProps} from '@steroidsjs/core/ui/layout/ProgressBar/ProgressBar';
import {useBem} from '@steroidsjs/core/hooks';

export default function CircleProgressBarView(props: IProgressBarViewProps) {
    const bem = useBem('CircleProgressBarView');
    const size = {
        large: {radius: 64},
        medium: {radius: 48},
        small: {radius: 32},
    };

    const getCircumference = () => 2 * Math.PI * size[props.size].radius;

    return (
        <div className={bem.block({
            size: props.size,
            status: props.status,
        })}
        >
            <svg>
                <g className={bem.element('circles')}>
                    <circle
                        className={bem.element('emptyCircle')}
                        style={{strokeDasharray: getCircumference()}}
                    />
                    <circle
                        className={bem.element('progressCircle')}
                        style={{
                            // eslint-disable-next-line max-len
                            strokeDashoffset: getCircumference() - (Math.min(props.percent, 100) * getCircumference()) / 100,
                            strokeDasharray: getCircumference(),
                        }}
                    />
                </g>
            </svg>
            <div className={bem.element('content')}>
                {props.label}
            </div>
        </div>
    );
}
