import * as React from 'react';
import {IPaginationViewProps} from '@steroidsjs/core/ui/list/Pagination/Pagination';
import {useBem} from '@steroidsjs/core/hooks';
import {Icon} from '@steroidsjs/core/ui/content';

const renderArrowStep = (
    bem: any,
    onClick: () => void,
    iconName: string,
    // eslint-disable-next-line default-param-last
    rotate = false,
    rounding?: {
        left?: boolean,
        right?: boolean,
    },
    disabled?: boolean,
) => (
    <li className={bem.element('page', {
        'rounding-left': rounding.left,
        'rounding-right': rounding.right,
        hasIcon: true,
        disabled,
    })}
    >
        <button
            className={bem.element(
                'page-button',
                {
                    hasIcon: true,
                },
            )}
            onClick={() => onClick()}
            disabled={disabled}
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
);

export default function PaginationButtonView(props: IPaginationViewProps) {
    const bem = useBem('PaginationButtonView');

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
                && renderArrowStep(bem, props.onSelectFirst, 'double_arrow_left', false, {left: true}, props.isFirstPage)}
            {props.showSteps
                && renderArrowStep(bem, props.onSelectPrev, 'arrow_left_24x24', false, {}, props.isFirstPage)}
            {props.pages.map((item, index) => (
                <li
                    key={index}
                    className={bem.element('page', {
                        hidden: !item.page,
                        active: item.isActive,
                    })}
                >
                    <button
                        className={bem.element('page-button', {
                            hidden: !item.page,
                        })}
                        onClick={() => props.onSelect(item.page)}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
            {props.showSteps
                && renderArrowStep(bem, props.onSelectNext, 'arrow_left_24x24', true, {}, props.isLastPage)}
            {props.showEdgeSteps
                && renderArrowStep(bem, props.onSelectLast, 'double_arrow_left', true, {right: true}, props.isLastPage)}
        </ul>
    );
}
