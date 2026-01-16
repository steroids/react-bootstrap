import {useBem} from '@steroidsjs/core/hooks';
import Button from '@steroidsjs/core/ui/form/Button';
import {INavViewProps} from '@steroidsjs/core/ui/nav/Nav/Nav';
import __isEmpty from 'lodash-es/isEmpty';
import * as React from 'react';

const DEFAULT_ICON = 'add';

export default function NavIconView(props: INavViewProps) {
    const bem = useBem('NavIconView');
    return (
        <div className={bem(bem.block(), props.className)}>
            <ul className={bem.element('list')}>
                {props.items.map((item, index) => {
                    const isDisabled = item.disabled;
                    const isActive = item.isActive;
                    const isActiveNested = item.isActiveNested;
                    const isBorder = item.border;

                    return (
                        <li
                            key={item.id || index}
                            className={bem(bem.element('list-item', {
                                active: isActive,
                                disabled: isDisabled,
                                nestedActive: isActiveNested,
                                hasItems: !!item.items,
                                hasBorder: isBorder,
                            }), props.navClassName)}
                        >
                            <Button
                                icon={props.icon ? props.icon : DEFAULT_ICON}
                                link
                                onClick={() => props.onClick(item, index)}
                                {...item}
                                label={item.label}
                                hint={item.hint || item.label || null}
                                {...item.itemProps}
                            />
                            {!isDisabled && (isActive || isActiveNested) && (
                                <ul className={bem.element('list-item-nested')}>
                                    {item.items?.map((nestedItem, nestedItemIndex) => (
                                        <li
                                            key={nestedItemIndex}
                                            className={bem.element('list-item-nested-item', {
                                                active: nestedItem.isActive,
                                            })}
                                        >
                                            <Button
                                                link
                                                onClick={() => props.onClick(nestedItem, nestedItemIndex)}
                                                {...nestedItem}
                                                label={nestedItem.label}
                                                hint={item.hint}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
            <div className={bem.element('content')}>
                {props.children}
            </div>
        </div>
    );
}
