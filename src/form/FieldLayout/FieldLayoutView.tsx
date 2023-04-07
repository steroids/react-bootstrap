import * as React from 'react';
import _isEmpty from 'lodash-es/isEmpty';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFieldLayoutViewProps} from '@steroidsjs/core/ui/form/FieldLayout/FieldLayout';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';

export default function FieldLayoutView(props: IFieldLayoutViewProps & IBemHocOutput) {
    const bem = useBem('FieldLayoutView');

    return (
        <div className={bem.block()}>
            {props.label && (
                <label
                    htmlFor={props.id}
                    className={bem.element('label', {
                        required: props.required,
                        size: props.size,
                    })}
                >
                    {props.label + ':'}
                </label>
            )}
            <div className={bem.element('field')}>
                {props.children}
                {!_isEmpty(props.errors) && (
                    <div className={bem.element('invalid-feedback')}>
                        {props.errors.filter(error => typeof error === 'string').map((error, index) => (
                            <div
                                key={index}
                                className={bem.element('error-message')}
                            >
                                <Icon
                                    name="error"
                                    className={bem.element('icon_error')}
                                    tabIndex={-1}
                                />
                                <span className={bem.element('error-text',
                                    {
                                        size: props.size || 'md',
                                    })}
                                >
                                    {error}

                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {_isEmpty(props.errors) && props.hint && (
                    <div className={bem.element('hint', {size: props.size})}>
                        {props.hint}
                    </div>
                )}
            </div>
        </div>
    );
}
