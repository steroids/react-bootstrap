import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {CheckboxField, RadioListField} from '@steroidsjs/core/ui/form';
import {ContentType, IDropDownFieldProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import {IFieldWrapperInputProps} from '@steroidsjs/core/ui/form/Field/fieldWrapper';
import {Accordion, AccordionItem} from '@steroidsjs/core/ui/content';
import './DropDownItemView.scss';

const GROUP_CONTENT_TYPE = 'group';

type PrimaryKey = string | number;

interface IDropDownItemViewProps extends Pick<IDropDownFieldProps, 'itemsContent'>, Pick<IFieldWrapperInputProps, 'size'> {
    item: {
        id: number,
        label: string,
        contentType?: ContentType,
        contentSrc?: 'string' | React.ReactElement,
    },
    primaryKey?: string,
    hoveredId?: string,
    selectedIds?: (PrimaryKey | any)[];
    onItemSelect?: (id: PrimaryKey | any) => void,
    onItemHover?: (id: PrimaryKey | any) => void,
    groupAttribute?: string;
}

export default function DropDownItemView(props: IDropDownItemViewProps) {
    const bem = useBem('DropDownItemView');

    const commonProps = {
        className:
            bem.element('option', {
                hover: props.hoveredId === props.item[props.primaryKey],
                select: props.selectedIds.includes(props.item[props.primaryKey]),
                size: props.size,
            }),
        onFocus: () => props.onItemHover(props.item[props.primaryKey]),
        onMouseOver: () => props.onItemHover(props.item[props.primaryKey]),
        onClick: (e) => {
            e.preventDefault();
            props.onItemSelect(props.item[props.primaryKey]);
        },

    };

    const renderTypeCases = (type: ContentType | 'group', src: string | React.ReactElement) => {
        switch (type) {
            case 'icon':
                return (
                    <div {...commonProps}>
                        {typeof src === 'string' ? (
                            <Icon
                                name={src}
                                className={bem.element('icon')}
                            />
                        ) : (
                            <span className={bem.element('icon')}>
                                {src}
                            </span>
                        )}
                        <span>
                            {props.item.label}
                        </span>
                    </div>
                );

            case 'checkbox':
                return (
                    <div {...commonProps}>
                        <CheckboxField
                            label={props.item.label}
                            className={bem.element('checkbox')}
                            size={props.size}
                            inputProps={{
                                checked: props.selectedIds.includes(props.item[props.primaryKey]),
                            }}
                        />
                    </div>
                );

            case 'img':
                return (
                    <div {...commonProps}>
                        <span className={bem.element('img')}>
                            <img
                                src={src === 'string' && src}
                                alt="custom source for item"
                            />
                        </span>
                        <span>
                            {props.item.label}
                        </span>
                    </div>
                );

            case 'radio':
                return (
                    <div {...commonProps}>
                        <RadioListField
                            items={[props.item]}
                            selectedIds={props.selectedIds}
                            className={bem.element('radio', {
                                size: props.size,
                            })}
                            size={props.size}
                        />
                    </div>
                );

            case 'group':
                return (
                    <Accordion>
                        <AccordionItem
                            title={props.item.label}
                            position="middle"
                            className={bem.element('group', {
                                size: props.size,
                            })}
                        >
                            {props.item[props.groupAttribute].map((subItem, itemIndex) => (
                                <DropDownItemView
                                    {...props}
                                    key={itemIndex}
                                    item={subItem}
                                />
                            ))}
                        </AccordionItem>
                    </Accordion>
                );

            default:
                return null;
        }
    };

    if (props.groupAttribute && Array.isArray(props.item[props.groupAttribute])) {
        return renderTypeCases(GROUP_CONTENT_TYPE, props.item[props.groupAttribute]);
    }

    if (props.item.contentType) {
        return renderTypeCases(props.item.contentType, props.item.contentSrc);
    }

    if (props.itemsContent) {
        return renderTypeCases(props.itemsContent.type, props.itemsContent.src);
    }

    return (
        <div {...commonProps}>
            {props.item.label}
        </div>
    );
}
