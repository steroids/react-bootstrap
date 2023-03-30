import * as React from 'react';

import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import {useBem} from '@steroidsjs/core/hooks';
import {Icon} from '@steroidsjs/core/ui/content';

export default function PaginationButtonView(props: IPaginationViewProps) {
    const bem = useBem('PaginationButtonView');

    const renderArrowStep = React.useCallback((
        callback: () => void,
        iconName: string,
        rotate = false,
        rounding?: {
            left?: boolean,
            right?: boolean,
        },
    ) => (
        <li className={bem(
            bem.element('page', {
                step: props.showSteps || props.showEdgeSteps,
                'rounding-left': !!rounding?.left,
                'rounding-right': !!rounding?.right,
                hasIcon: props.showSteps || props.showEdgeSteps,
                disabled: props.disabled,
            }),
        )}
        >
            <button
                className={bem(
                    bem.element('page-button',
                        {
                            hasIcon: props.showSteps || props.showEdgeSteps,
                        }),
                )}
                onClick={() => callback()}
            >
                <Icon
                    tabIndex={-1}
                    className={bem.element('page-icon', {
                        rotate,
                    })}
                    name={iconName}
                />
            </button>
        </li>
    ), [bem, props.showEdgeSteps, props.showSteps]);

    return (
        <ul
            className={bem(
                bem.block({
                    size: props.size,
                }),
                props.className,
            )}
        >
            {props.showEdgeSteps
                && renderArrowStep(props.onSelectFirst, 'double-arrow-left', false, {left: true})}
            {props.showSteps
                && renderArrowStep(props.onSelectPrev, 'arrow-left')}
            {props.pages.map((item, index) => (
                <li
                    key={index}
                    className={bem(
                        bem.element('page', {
                            hidden: !item.page,
                            active: item.isActive,
                            disabled: props.disabled,
                        }),
                    )}
                >
                    <button
                        className={bem(
                            bem.element('page-button', {
                                hidden: !item.page,
                            }),
                        )}
                        onClick={() => props.onSelect(item.page)}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
            {props.showSteps
                && renderArrowStep(props.onSelectNext, 'arrow-left', true)}
            {props.showEdgeSteps
                && renderArrowStep(props.onSelectFirst, 'double-arrow-left', true, {right: true})}
        </ul>
    );
}
