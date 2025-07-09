import * as React from 'react';
import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {useBem} from '@steroidsjs/core/hooks';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {DropDown} from '@steroidsjs/core/ui/content';
import {getSelectedItemsCount, getSelectedItemsLabel} from './utils';

export default function DropDownFieldView(props: IDropDownFieldViewProps) {
    const bem = useBem('DropDownFieldView');

    const {onClose} = props;

    const fieldRef = React.useRef(null);

    React.useEffect(() => {
        // setTimeout - костыль, который исправляет ошибку прыгающего экрана, которая возникает, т.к. компонент в DropDown не успевает
        // спозиционироваться на странице и она автоматически прокручивается вниз страницы
        setTimeout(() => {
            if (props.autoCompleteInputForwardedRef.current && props.isSearchAutoFocus && props.isOpened) {
                props.autoCompleteInputForwardedRef.current.focus();
            }
        }, 50);
    // проверка отключена, т.к. необходимо вызывать focus при изменении props.autoCompleteInputForwardedRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpened, props.isSearchAutoFocus, props.autoCompleteInputForwardedRef.current]);

    const renderPlaceholder = React.useCallback(() => props.placeholder && !props.selectedIds?.length
        ? (
            <div className={bem.element('placeholder')}>{props.placeholder}</div>
        )
        : null, [bem, props.placeholder, props.selectedIds]);

    const menuWidth = React.useMemo(() => {
        if (!fieldRef.current) {
            return 0;
        }
        return fieldRef.current.getBoundingClientRect().width;
        // Отключена проверка, т.к. необходимо пересчитывать ширину меню, когда меняется филд
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldRef.current, props.isOpened]);

    const renderList = React.useCallback(() => (
        <div
            className={bem.element('drop-down')}
            style={{
                '--width': menuWidth + 'px',
                '--maxHeight': props.maxHeight,
            } as React.CSSProperties}
        >
            {props.isAutoComplete && (
                <div className={bem.element('search', {
                    size: props.size,
                })}
                >
                    <Icon
                        name='search'
                        className={bem.element('search-icon')}
                    />
                    <input
                        {...props.searchInputProps}
                        ref={props.autoCompleteInputForwardedRef}
                        onChange={e => props.searchInputProps.onChange(e.target.value)}
                        className={bem(
                            bem.element('search-input'),
                            props.searchInputProps.className,
                        )}
                    />
                </div>
            )}
            <div className={bem.element('drop-down-list')}>
                {props.multiple
                            && props.itemToSelectAll
                            && props.renderItem(props.itemToSelectAll)}
                {props.items.map((item) => props.renderItem(item))}
            </div>
        </div>
    ), [bem, menuWidth, props]);

    const closeIfOpened = React.useCallback(() => {
        if (props.isOpened) {
            onClose();
        }
    }, [onClose, props.isOpened]);

    return (
        <DropDown
            content={renderList}
            position={props.viewProps.position}
            autoPositioning={props.viewProps.autoPositioning}
            visible={props.isOpened}
            onClose={onClose}
            hasArrow={false}
            className={bem.element('wrapper')}
        >
            <div>
                <div
                    className={bem(bem.block(
                        {
                            size: props.size,
                            [`${props.color}`]: !!props.color && !props.outline,
                            [`outline_${props.color}`]: props.outline,
                            opened: props.isOpened,
                            'is-invalid': !!props.errors,
                            disabled: props.disabled,
                        },
                    ), props.className)}
                    onKeyPress={e => e.key === 'Enter' && !props.disabled && props.onOpen()}
                    style={props.style}
                    role="button"
                    tabIndex={0}
                    onClick={closeIfOpened}
                    ref={fieldRef}
                >
                    <div
                        className={bem.element('selected-items', {
                            reset: props.showReset,
                        })}
                        onClick={props.onOpen}
                        tabIndex={-1}
                        role='button'
                    >
                        {renderPlaceholder()}
                        <span
                            className={bem.element('selected-items')}
                        >
                            {props.showEllipses
                                ? getSelectedItemsLabel(props.selectedItems)
                                : getSelectedItemsCount(props.selectedItems)}
                        </span>
                        <input
                            className={bem.element('input')}
                            ref={props.inputRef}
                        />
                    </div>
                    {props.showReset && props.selectedIds.length > 0 && (
                        <Icon
                            name="cross_8x8"
                            className={bem.element('icon-close')}
                            tabIndex={-1}
                            onClick={props.onReset}
                            aria-label={__('Сбросить')}
                        />
                    )}
                    <Icon
                        name='arrow_down_24x24'
                        className={bem.element('icon-chevron')}
                        tabIndex={-1}
                        onClick={props.onOpen}
                    />
                </div>
            </div>
        </DropDown>
    );
}
