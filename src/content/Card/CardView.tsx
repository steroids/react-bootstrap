import React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {ICardViewProps} from '@steroidsjs/core/ui/content/Card/Card';
import {Button} from '@steroidsjs/core/ui/form';
import Avatar from '@steroidsjs/core/ui/content/Avatar/Avatar';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {Link} from '@steroidsjs/core/ui/nav';

export default function CardView(props: ICardViewProps) {
    const bem = useBem('CardView');

    const hasContent = !!(props.title || props.buttons || props.links || props.description || props.children);

    return (
        <div
            className={bem(bem.block(),
                props.className)}
            style={props.style}
        >
            {props.header && (
                <div className={bem.element('header',
                    {
                        withoutCover: !props.cover && hasContent,
                    })}
                >
                    <div className={bem.element('header-data')}>
                        {props.header.avatar && (
                            <Avatar
                                {...props.header.avatar}
                                className={bem(
                                    props.header.avatar.className,
                                    bem.element('header-avatar'),
                                )}
                            />
                        )}
                        <div className={bem.element('header-text-content')}>
                            <h3 className={bem.element('header-head')}>
                                {props.header.head}

                            </h3>
                            <p className={bem.element('header-subhead')}>
                                {props.header.subhead}

                            </p>
                        </div>
                    </div>
                    {props.header.menu && (
                        <div
                            className={bem.element('header-menu')}
                            role='button'
                        >
                            <Icon
                                name='menu_dots'
                                className={bem.element('header-dots')}
                            />
                        </div>
                    )}
                </div>
            )}
            {props.cover && (
                <div className={bem.element('cover')}>
                    <img
                        src={props.cover}
                        alt='Card cover img'
                    />
                </div>
            )}
            {hasContent && (
                <div className={bem.element('content')}>
                    {props.title && (
                        <h3 className={bem.element('title')}>
                            {props.title}
                        </h3>
                    )}
                    <div className={bem.element('content-inner')}>
                        {props.description && (
                            <p className={bem.element('description')}>
                                {props.description}
                            </p>
                        )}
                        {props.buttons && (
                            <div className={bem.element('buttons')}>
                                {props.buttons.map((button, buttonIndex) => (
                                    <Button
                                        {...button}
                                        key={buttonIndex}
                                    />
                                ))}
                            </div>
                        )}
                        {props.links && (
                            <div className={bem.element('links')}>
                                {props.links.map((link, linkIndex) => (
                                    <Link
                                        {...link}
                                        key={linkIndex}
                                    />
                                ))}
                            </div>
                        )}
                        {props.children}
                    </div>
                </div>
            )}
            {props.footer && (
                <div className={bem.element('footer')}>
                    <h3 className={bem.element('footer-head')}>{props.footer.head}</h3>
                    <p className={bem.element('footer-subhead')}>{props.footer.subhead}</p>
                </div>
            )}
        </div>
    );
}
