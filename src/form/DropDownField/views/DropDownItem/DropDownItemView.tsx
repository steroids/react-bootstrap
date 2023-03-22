import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {CheckboxField, RadioListField} from '@steroidsjs/core/ui/form';
import {ContentType, IDropDownFieldProps} from '@steroidsjs/core/ui/form/DropDownField/DropDownField';

import './DropDownItemView.scss';

type PrimaryKey = string | number;

interface IDropDownItemViewProps extends Pick<IDropDownFieldProps, 'contentProperties'> {
    item: {
        id: number,
        label: string,
        contentType?: 'checkbox' | 'radio' | 'dropdown' | 'icon' | 'img',
        contentSrc?: 'string' | React.ReactElement,
    },
    primaryKey?: string,
    hoveredId?: string,
    selectedIds?: (PrimaryKey | any)[];
    onItemSelect?: (id: PrimaryKey | any) => void,
    onItemHover?: (id: PrimaryKey | any) => void,
    groupAttribute?: string;
    level?: number;
}

export default function DropDownItemView(props: IDropDownItemViewProps) {
    const bem = useBem('DropDownItemView');
    const commonProps = {
        className:
            bem.element('option', {
                hover: props.hoveredId === props.item[props.primaryKey],
                select: props.selectedIds.includes(props.item[props.primaryKey]),
                level: !!props.level,
            }),
        onFocus: () => props.onItemHover(props.item[props.primaryKey]),
        onMouseOver: () => props.onItemHover(props.item[props.primaryKey]),
        onClick: (e) => {
            e.preventDefault();
            props.onItemSelect(props.item[props.primaryKey]);
        },

    };

    const renderTypeCases = (type: ContentType, src: string | React.ReactElement) => {
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
                                alt="flag"
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
                            className={bem.element('radio')}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    if (props.item.contentType) {
        return renderTypeCases(props.item.contentType, props.item.contentSrc);
    }

    if (props.contentProperties) {
        return renderTypeCases(props.contentProperties.type, props.contentProperties.src);
    }

    return (
        <div {...commonProps}>
            {props.item.label}
        </div>
    );
}

// if (props.groupAttribute && Array.isArray(props.item[props.groupAttribute])) {
//     return [
//         (
//             <div
//                 key={String(props.item[props.primaryKey])}
//                 className={bem.element('drop-down-item', 'group')}
//             >
//                 {props.item.label}
//             </div>
//         ),
//         ...props.item[props.groupAttribute].map(subItem => <DropDownItem item={subItem} level={level + 1} />),
//     ];
// }
