import * as React from 'react';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import {useBem} from '@steroidsjs/core/hooks';

import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import TimePanelView from './TimePanelView';

import './TimeFieldView.scss';

export default function TimeFieldView(props: ITimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('TimeFieldView');
    const renderBody = () => (
        <div
            className={bem(
                bem.block({
                    disabled: props.disabled,
                    'no-border': props.noBorder,
                }), props.className,
            )}
            onFocus={(e) => {
                e.preventDefault();
                props.openPanel();
            }}
        >
            <div className={bem.element('body')}>
                <input
                    {...props.inputProps}
                    className={bem(
                        bem.element('input'),
                        props.isInvalid && 'is-invalid',
                    )}
                    onChange={e => props.inputProps.onChange(e.target.value)}
                />
                <div className={bem.element('icon-container')}>
                    <Icon
                        className={bem.element('icon')}
                        name='clock'
                    />
                    {props.showRemove && props.input.value && (
                        <Icon
                            className={bem.element('icon', 'close')}
                            onClick={(e) => {
                                e.preventDefault();
                                props.clearInput();
                            }}
                            name='times-circle'
                        />
                    )}
                </div>
            </div>
        </div>
    );
    return (
        <DropDown
            position='bottomLeft'
            content={() => <TimePanelView {...props} />}
            visible={props.isPanelVisible}
            toggleVisibility={(value) => value ? props.closePanel() : props.openPanel()}
        >
            {renderBody()}
        </DropDown>
    );
}
