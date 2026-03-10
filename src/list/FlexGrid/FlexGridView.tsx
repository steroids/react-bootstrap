import {useBem} from '@steroidsjs/core/hooks';
import {IFlexGridViewProps} from '@steroidsjs/core/ui/list/FlexGrid/FlexGrid';
import * as React from 'react';

export default function FlexGridView(props: IFlexGridViewProps) {
    const bem = useBem('FlexGridView');
    const halfColGap = props.colGap / 2;
    const hasItems = !!props.items?.length;

    const colGapStyle = hasItems
        ? {
            marginRight: -halfColGap,
            marginLeft: -halfColGap,
        }
        : {
            columnGap: props.colGap,
        };

    return (
        <div
            className={bem(
                bem.block({
                    wrap: props.wrap,
                    align: props.align,
                    direction: props.direction,
                    justify: props.justify,
                }),
                props.className,
            )}
            style={{
                ...props.style,
                ...colGapStyle,
                rowGap: props.rowGap,

            }}
        >
            {hasItems && props.items.map((item, index) => (
                <div
                    key={index}
                    className={bem(
                        bem.element('item', {
                            col: item.col,
                            lg: item.lg,
                            md: item.md,
                            sm: item.sm,
                            offset: item.offset,
                        }),
                        props.itemClassName,
                    )}
                    style={{
                        paddingRight: halfColGap,
                        paddingLeft: halfColGap,
                        order: item.order,
                    }}
                >
                    {item.content}
                </div>
            ))}
            {props.children}
        </div>
    );
}
