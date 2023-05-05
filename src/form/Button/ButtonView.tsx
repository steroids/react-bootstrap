import * as React from 'react';
import _isString from 'lodash-es/isString';

import {IButtonViewProps} from '@steroidsjs/core/ui/form/Button/Button';

import Icon from '@steroidsjs/core/ui/content/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function ButtonView(props: IButtonViewProps) {
    const bem = useBem('ButtonView');

    const renderLabel = () => {
        const title = props.label && _isString(props.label)
            ? props.label
            : (props.hint || null);
        return (
            <>
                {props.isLoading && (
                    <Icon
                        className={bem.element('loader')}
                        name='loading_icon_thick'
                        tabIndex={-1}
                    />
                )}
                {!props.isLoading && (
                    <span
                        title={props.hint}
                        className={bem.element(props.link ? 'link' : 'label')}
                    >
                        {props.icon && (
                            <Icon
                                name={props.icon}
                                title={title}
                                className={bem.element('icon', !props.label && 'without-label')}
                            />
                        )}
                        <span className={bem.element('text')}>
                            {props.children}
                        </span>
                    </span>
                )}
            </>
        );
    };

    const renderBadge = () => {
        if (!props.badge || !props.badge.enable) {
            return null;
        }

        return (
            <span
                className={bem(
                    bem.element('badge',
                        {
                            [`${props.badge.color}`]: !!props.badge.color,
                        }),
                    props.badge.className,
                )}
            >
                {props.badge.value}
            </span>
        );
    };

    const className = bem(
        bem.block({
            button: !props.link,
            [`color_${props.color}`]: props.color && !props.outline,
            [`outline_${props.color}`]: props.outline,
            outline: props.outline,
            size: props.size,
            disabled: props.disabled,
            submitting: props.submitting,
            loading: props.isLoading,
            failed: props.isFailed,
            link: props.link,
            block: props.block,
            [`tag-${props.tag}`]: !!props.tag,
        }),
        props.className,
    );

    if (props.tag === 'a') {
        return (
            <a
                className={className}
                href={props.url}
                onClick={props.onClick}
                style={props.style}
                target={props.target}
            >
                {renderLabel()}
                {renderBadge()}
            </a>
        );
    }

    return (
        <button
            title={props.hint}
            type={props.type}
            disabled={props.disabled || props.isLoading}
            onClick={props.onClick}
            style={props.style}
            className={className}
        >
            {renderLabel()}
            {renderBadge()}
        </button>
    );
}
