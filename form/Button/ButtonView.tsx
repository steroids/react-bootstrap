import * as React from 'react';
import _isString from 'lodash-es/isString';

import {IButtonViewProps} from '@steroidsjs/core/ui/form/Button/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import {useBem} from '@steroidsjs/core/hooks';

export default function ButtonView(props: IButtonViewProps & IBemHocOutput) {
    const bem = useBem('ButtonView');

    const renderLabel = () => {
        const title = props.label && _isString(props.label)
            ? props.label
            : (props.hint || null);
        return (
            <>
                {props.isLoading && (
                    <div className={bem.element('preloader')}>
                        <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                        />
                    </div>
                )}
                {(props.showLabelOnLoading || !props.isLoading) && (
                    <span
                        className={bem.element('label')}
                    >
                        {props.icon && (
                            <Icon
                                name={props.icon}
                                title={title}
                                className={bem.element('icon', !props.label && 'without-label')}
                            />
                        )}
                        {props.children}
                    </span>
                )}
            </>
        );
    }

    const renderBadge = () => {
        if (!props._badge.enable) {
            return null;
        }

        return (
            <span className={bem(
                'badge',
                props._badge.color && 'badge-' + props._badge.color,
                bem.element('badge'),
                props._badge.className,
            )}>
                {props._badge.value}
            </span>
        )
    }

    const _getClassName = (modifiers = {}) => {
        return bem(
            bem.block({
                color: props.color,
                outline: props.outline,
                size: props.size,
                disabled: props.disabled,
                submitting: props.submitting,
                'is-loading': props.isLoading,
                'is-failed': props.isFailed,
                ...modifiers,
            }),
            !props.link && 'btn',
            props.size && 'btn-' + props.size,
            !props.link && 'btn-' + (props.outline ? 'outline-' : '') + props.color,
            props.block && 'btn-block',
            props.link && 'btn-link',
            props.className,
        );
    }

    if (props.tag === 'a') {
        return (
            <a
                className={_getClassName({link: true})}
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
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
            style={props.style}
            className={_getClassName()}
        >
            {renderLabel()}
            {renderBadge()}
        </button>
    );

}
