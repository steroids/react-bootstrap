import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IContentColumnViewProps} from '@steroidsjs/core/ui/list/Grid/Grid';
import Format from '@steroidsjs/core/ui/format/Format';
import _get from 'lodash-es/get';
import {Link} from '@steroidsjs/core/ui/nav';
import {Icon} from '@steroidsjs/core/ui/content';

export default function ContentColumnView(props: IContentColumnViewProps) {
    const bem = useBem('ContentColumnView');

    const hasLink = !!props.link?.attribute;
    const hasPicture = !!props.picture?.attribute;
    const hasIcon = !!props.icon?.attribute;
    const hasSubtitle = !!props.subtitleAttribute;
    const hasTextData = !!props.attribute || !!props.subtitleAttribute || hasLink;

    const renderFormat = () => (
        <Format
            {...props}
            {...(props.formatter || {})}
            attribute={hasLink ? props.link.attribute : props.attribute}
        />
    );

    const renderValue = () => {
        if (hasLink) {
            return (
                <Link
                    {...props.link.linkProps}
                    url={_get(props.item, props.link?.urlAttribute)}
                    className={bem.element('link')}
                >
                    {renderFormat()}
                </Link>
            );
        }

        return (
            <span className={bem.element('value')}>
                {renderFormat()}
            </span>
        );
    };

    return (
        <div className={bem(bem.block({
            size: props.size,
            isLeft: props.picture?.isLeft || props.icon?.isLeft,
        }))}
        >
            {hasTextData && (
                <div className={bem.element('data')}>
                    {renderValue()}
                    {hasSubtitle && <span className={bem.element('subtitle')}>{_get(props.item, props.subtitleAttribute)}</span>}
                </div>
            )}
            {hasPicture && (
                <span className={bem.element('picture')}>
                    <img
                        src={_get(props.item, props.picture.attribute)}
                        alt="cell element"
                    />
                </span>
            )}
            {hasIcon && (
                <Icon
                    name={_get(props.item, props.icon.attribute)}
                    className={bem.element('icon')}
                />
            )}
        </div>
    );
}
