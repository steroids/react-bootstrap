import React, {useCallback} from 'react';
import _isString from 'lodash-es/isString';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';
import {IStepItemViewProps, HORIZONTAL_STEP_LAYOUT, VERTICAL_STEP_LAYOUT} from '@steroidsjs/core/ui/list/Steps/Steps';

export default function StepItemView(props: IStepItemViewProps) {
    const bem = useBem('StepItemView');

    const renderIcon = useCallback(() => (
        _isString(props.stepItem.icon)
            ? (
                <Icon
                    name={props.stepItem.icon as string}
                />
            )
            : (
                <span className={bem.element('icon')}>
                    {props.index}
                </span>
            )
    ), [bem, props.index, props.stepItem.icon]);

    const renderDivider = useCallback(() => (
        <div className={bem.element('divider')}>
            <div className={bem.element('divider-line')} />
        </div>
    ), [bem]);

    return (
        <div
            key={props.index}
            className={bem(bem.block(
                    {
                        [props.status]: true,
                        [`${props.stepTitleOrientation}`]: !!props.stepTitleOrientation,
                    },
                ), props.className)}
        >
            <div
                className={bem.element('body', {disabled: props.disabled})}
                onClick={() => props.onChange(props.index)}
            >
                {props.showDivider && props.stepTitleOrientation === VERTICAL_STEP_LAYOUT && renderDivider()}
                <div className={bem.element('step')}>
                    {renderIcon()}
                </div>
                <div className={bem.element('content')}>
                    <div className={bem.element('header')}>
                        {props.stepItem.title && (
                            <div className={bem.element('title')}>
                                {props.stepItem.title}
                            </div>
                        )}
                        {props.stepItem.subtitle && (
                            <div className={bem.element('subtitle')}>
                                {props.stepItem.subtitle}
                            </div>
                        )}
                    </div>
                    {props.stepItem.description && (
                        <div className={bem.element('description')}>
                            {props.stepItem.description}
                        </div>
                    )}
                </div>
            </div>
            {props.showDivider && props.stepTitleOrientation === HORIZONTAL_STEP_LAYOUT && renderDivider()}
        </div>
    );
}
