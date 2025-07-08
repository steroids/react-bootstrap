import React, {CSSProperties, useMemo} from 'react';
import {IDropDownFieldViewProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {Icon} from '@steroidsjs/core/ui/content';
import {IBem} from '@steroidsjs/core/hooks/useBem';
import {useMount} from 'react-use';

interface IDropDownFieldOpenedContentProps extends Pick<IDropDownFieldViewProps,
'isAutoComplete' | 'size' | 'searchInputProps' | 'autoCompleteInputForwardedRef' | 'multiple' | 'itemToSelectAll' | 'renderItem' | 'items'
| 'isSearchAutoFocus' | 'maxHeight'
> {
    bem: IBem,
    uniqueId: string,
}

export default function DropDownFieldOpenedContent(props: IDropDownFieldOpenedContentProps) {
    const {bem} = props;

    const width = useMemo(() => {
        const inputElement = document.getElementById(props.uniqueId);

        if (!inputElement) {
            return 0;
        }
        return inputElement.getBoundingClientRect().width;
    }, [props.uniqueId]);

    useMount(() => {
        if (props.autoCompleteInputForwardedRef?.current && props.isSearchAutoFocus) {
            // setTimeout - костыль, который исправляет ошибку прыгающего экрана, которая возникает, т.к. компонент в DropDown не успевает
            // спозиционироваться на странице и она автоматически прокручивается вниз страницы
            setTimeout(() => {
                props.autoCompleteInputForwardedRef.current.focus();
            }, 50);
        }
    });

    return (
        <div
            className={bem.element('drop-down')}
            style={{
                '--width': width + 'px',
                '--maxHeight': props.maxHeight,
            } as CSSProperties}
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
    );
}
