import * as React from 'react';

import {useBem, useScreen} from '@steroidsjs/core/hooks';
import {IFlexGridViewProps} from '@steroidsjs/core/ui/list/FlexGrid';

export default function FlexGridView(props: IFlexGridViewProps) {
    const bem = useBem('FlexGridView');
    const {isDesktop, isTablet, isPhone} = useScreen();

    const halfColGapLg = props.lg?.colGap / 2;
    const halfColGapMd = props.md?.colGap / 2;
    const halfColGapSm = props.sm?.colGap / 2;

    const halfColGap = props.colGap / 2
        || (isDesktop && halfColGapLg)
        || (isTablet && halfColGapMd)
        || (isPhone && halfColGapSm);

    const rowGap = props.rowGap
        || (isDesktop && props.lg?.rowGap)
        || (isTablet && props.md?.rowGap)
        || (isPhone && props.sm?.rowGap);

    console.log(isDesktop, isTablet, isPhone);

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
                marginRight: -halfColGap,
                marginLeft: -halfColGap,
                rowGap,
            }}
        >
            {!!props.items?.length && props.items.map((item, index) => (
                <div
                    key={index}
                    className={bem.element('item', {
                        col: item.col,
                    })}
                    style={{
                        paddingRight: halfColGap,
                        paddingLeft: halfColGap,
                    }}
                >
                    {item.content}
                </div>
            ))}
            {props.children}
        </div>
    );
}
