import * as React from 'react';
import _isEmpty from 'lodash-es/isEmpty';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IFieldLayoutViewProps} from '@steroidsjs/core/ui/form/FieldLayout/FieldLayout';
import {useBem} from '@steroidsjs/core/hooks';

export default function FieldLayoutView(props: IFieldLayoutViewProps & IBemHocOutput) {
    const bem = useBem('FieldLayoutView');

    return (
        <div
            className={bem(
                bem.block({
                    layout: props.layout.layout,
                }),
                'form-group',
                props.layout.className,
                props.layout.layout === 'horizontal' && 'row',
                props.layout.layout === 'inline' && 'form-inline mb-0',
            )}
            style={props.layout.style}
        >
            {props.label && (
                <div
                    className={bem(
                        bem.element('label', {
                            required: props.required,
                        }),
                        props.layout.layout === 'horizontal' && 'col-form-label text-right',
                        props.layout.layout === 'horizontal' && 'col-' + props.layout.cols[0],
                        props.layout.layout === 'inline' && 'sr-only',
                    )}
                >
                    {props.label + ':'}
                </div>
            )}
            <div
                className={bem(
                    bem.element('field'),
                    props.layout.layout === 'horizontal' && 'col-' + props.layout.cols[1],
                    props.layout.layout === 'horizontal' && !props.label && 'offset-' + props.layout.cols[0],
                    props.layout.layout === 'inline' && 'w-100',
                )}
            >
                {props.children}
                {!_isEmpty(props.errors) && (
                    <div className={bem(bem.element('invalid-feedback'), 'invalid-feedback')}>
                        {[].concat(props.errors).filter(error => typeof error === 'string').map((error, index) => (
                            <div key={index}>
                                {error}
                            </div>
                        ))}
                    </div>
                )}
                {_isEmpty(props.errors) && props.layout.layout !== 'inline' && props.hint && (
                    <div className={bem(bem.element('hint'), 'text-muted')}>
                        {props.hint}
                    </div>
                )}
            </div>
        </div>
    );
}
