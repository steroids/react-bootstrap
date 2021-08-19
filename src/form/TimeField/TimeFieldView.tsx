import * as React from 'react';
import {useCallback} from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {ITimeFieldViewProps} from '@steroidsjs/core/ui/form/TimeField/TimeField';
import Icon from '@steroidsjs/core/ui/icon/Icon';
import DropDown from '@steroidsjs/core/ui/content/DropDown';
import TimePanelView from './TimePanelView';

export default function TimeFieldView(props: ITimeFieldViewProps & IBemHocOutput) {
    const bem = useBem('TimeFieldView');

    const renderContent = useCallback(() => (
        <TimePanelView {...props.timePanelViewProps} />
    ), [props.timePanelViewProps]);

    const renderBody = () => (
        <div
            className={bem(
                bem.block({
                    disabled: props.disabled,
                    'no-border': props.noBorder,
                }),
                props.className,
            )}
        >
            <div className={bem.element('body')}>
                <input
                    {...props.inputProps}
                    className={bem(
                        bem.element('input'),
                        !!props.errors && 'is-invalid',
                    )}
                    onChange={e => props.inputProps.onChange(e.target.value)}
                />
                <div className={bem.element('icon-container')}>
                    <Icon
                        className={bem.element('icon')}
                        name='clock'
                    />
                    {props.showRemove && props.inputProps.value && props.icon !== false && (
                        <Icon
                            className={bem.element('icon', 'close')}
                            onClick={(e) => {
                                e.preventDefault();
                                props.onClear();
                            }}
                            name={typeof props.icon === 'string' ? props.icon : 'times-circle'}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <DropDown
            position='bottomLeft'
            content={renderContent}
            visible={props.isOpened}
            onClose={props.onClose}
        >
            {renderBody()}
        </DropDown>
    );
}
