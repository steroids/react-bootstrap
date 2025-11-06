import * as React from 'react';
import {IAutoCompleteFieldViewProps, IAutoCompleteItem} from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';
import {useBem} from '@steroidsjs/core/hooks';
import _isEmpty from 'lodash-es/isEmpty';
import Text from '@steroidsjs/core/ui/typography/Text/Text';
import {Icon} from '@steroidsjs/core/ui/content';
import {IBem} from '@steroidsjs/core/hooks/useBem';

const normalizeItems = (items: IAutoCompleteItem[]) => {
    const categories: {
        [key: string]: IAutoCompleteItem[],
    } = {};

    const itemsWithoutCategory: IAutoCompleteItem[] = [];

    items.forEach(item => {
        if (item.category) {
            if (categories[item.category]) {
                categories[item.category].push(item);
                return;
            }

            categories[item.category] = [item];
            return;
        }

        itemsWithoutCategory.push(item);
    });

    return {
        categories,
        itemsWithoutCategory,
    };
};

const renderItem = (item: IAutoCompleteItem, props: IAutoCompleteFieldViewProps, bem: IBem) => {
    const hasAdditionalIcon = !!item.additional?.icon;
    const hasAdditionalText = !!item.additional?.text;
    const hasSomeAdditional = hasAdditionalText || hasAdditionalIcon;

    const uniqId = item[props.primaryKey];

    return (
        <button
            type="button"
            key={String(uniqId)}
            className={bem.element('item', {
                hover: props.hoveredId === uniqId,
                select: props.selectedIds.includes(uniqId),
            })}
            onClick={() => props.onItemSelect(uniqId)}
            onFocus={() => props.onItemHover(uniqId)}
            onMouseOver={() => props.onItemHover(uniqId)}
        >
            <span className={bem.element('item-label')}>{item.label}</span>
            {hasSomeAdditional && (
                <div className={bem.element('item-additional')}>
                    {hasAdditionalIcon && (
                        <Icon
                            name={item.additional?.icon}
                            className={bem.element('item-additional-icon')}
                        />
                    )}
                    {hasAdditionalText && (
                        <span className={bem.element('item-additional-text')}>
                            {item.additional.text}
                        </span>
                    )}
                </div>
            )}
        </button>
    );
};

export default function AutoCompleteFieldView(props: IAutoCompleteFieldViewProps) {
    const bem = useBem('AutoCompleteFieldView');

    const renderItems = React.useCallback(() => {
        if (!_isEmpty(props.categories)) {
            const {categories, itemsWithoutCategory} = normalizeItems(props.items);

            return (
                <>
                    {Object.entries(categories).map(([category, categoryItems]) => (
                        <div
                            key={category}
                            className={bem.element('category')}
                        >
                            <span className={bem.element('category__label')}>
                                {category}
                            </span>
                            <div className={bem.element('category__content')}>
                                {categoryItems.map(item => renderItem(item, props, bem))}
                            </div>
                        </div>
                    ))}
                    {itemsWithoutCategory.map(item => renderItem(item, props, bem))}
                </>
            );
        }

        return (
            <>
                {props.items.map(item => renderItem(item, props, bem))}
            </>
        );
    }, [bem, props]);

    return (
        <div
            ref={props.forwardedRef}
            className={bem(
                bem.block({
                    size: props.size,
                    opened: props.isOpened,
                    hasClearIcon: props.showClear && !props.disabled,
                    filled: !!props.inputProps.value,
                    disabled: props.disabled,
                }), props.className,
            )}
            style={props.style}
        >
            <div className={bem.element('input-wrapper')}>
                <input
                    {...props.inputProps}
                    className={bem(
                        bem.element('input'),
                        props.inputProps.className,
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onOpen();
                    }}
                    onChange={e => props.inputProps.onChange(e.target.value)}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    required={props.required}
                />
                {!props.disabled && props.showClear && !!props.inputProps.value && (
                    <Icon
                        name='cross_8x8'
                        className={bem.element('icon-clear')}
                        tabIndex={-1}
                        onClick={props.onClear}
                    />
                )}
            </div>
            {props.isOpened && (
                <div className={bem.element('drop-down')}>
                    <div className={bem.element('list')}>
                        {!_isEmpty(props.items)
                            ? renderItems()
                            : (
                                <Text
                                    className={bem.element('nothing')}
                                    content={props.empty ?? __('Ничего не найдено')}
                                    type='text'
                                />
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}
