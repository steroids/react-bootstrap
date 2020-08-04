import * as React from 'react';
import _isString from 'lodash-es/isString';

import {bem} from '@steroidsjs/core/hoc';
import {IButtonViewProps} from '@steroidsjs/core/ui/form/Button/Button';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import Icon from '@steroidsjs/core/ui/icon/Icon';

@bem('ButtonView')
export default class ButtonView extends React.PureComponent<IButtonViewProps & IBemHocOutput> {

    render() {
        return this.props.link || this.props.url ? this.renderLink() : this.renderButton();
    }

    renderLink() {
        return (
            <a
                className={this._getClassName({link: true})}
                href={this.props.url}
                onClick={this.props.onClick}
                style={this.props.style}
                target={this.props.target}
            >
                {this.renderLabel()}
                {this.renderBadge()}
            </a>
        );
    }

    renderButton() {
        return (
            <button
                type={this.props.type}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
                style={this.props.style}
                className={this._getClassName()}
            >
                {this.renderLabel()}
                {this.renderBadge()}
            </button>
        );
    }

    renderLabel() {
        const bem = this.props.bem;
        return (
            <>
                {this.props.isLoading && (
                    <div className={bem.element('preloader')}>
                        <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                        />
                    </div>
                )}
                {(this.props.showLabelOnLoading || !this.props.isLoading) && (
                    <span
                        className={bem.element('label')}
                    >
                        {this.props.icon && (
                            <Icon
                                name={this.props.icon}
                                title={_isString(this.props.label) ? this.props.label : null}
                                className={bem(
                                    bem.element('icon', !this.props.label && 'without-label'),
                                    'material-icons'
                                )}
                            />
                        )}
                            {this.props.children}
                    </span>
                )}
            </>
        );
    }

    renderBadge() {
        if (!this.props._badge.enable) {
            return null;
        }

        const bem = this.props.bem;
        return (
            <span className={bem(
                'badge',
                this.props._badge.color && 'badge-' + this.props._badge.color,
                bem.element('badge'),
                this.props._badge.className,
            )}>
                {this.props._badge.value}
            </span>
        )
    }

    _getClassName(modifiers = {}) {
        const bem = this.props.bem;
        return bem(
            bem.block({
                color: this.props.color,
                outline: this.props.outline,
                size: this.props.size,
                disabled: this.props.disabled,
                submitting: this.props.submitting,
                'is-loading': this.props.isLoading,
                'is-failed': this.props.isFailed,
                ...modifiers,
            }),
            this.props.className,
            !this.props.link && 'btn',
            this.props.size && 'btn-' + this.props.size,
            !this.props.link && 'btn-' + (this.props.outline ? 'outline-' : '') + this.props.color,
            this.props.block && 'btn-block',
            this.props.link && 'btn-link',
        );
    }
}
