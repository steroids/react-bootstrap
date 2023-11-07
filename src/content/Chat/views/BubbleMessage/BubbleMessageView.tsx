import React, {memo, useState} from 'react';
import {useInterval} from 'react-use';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Avatar} from '@steroidsjs/core/ui/content/Avatar';
import {Text} from '@steroidsjs/core/ui/typography';
import Title from '@steroidsjs/core/ui/typography/Title';
import Icon from '@steroidsjs/core/ui/content/Icon';
import {IChatUser} from '@steroidsjs/core/ui/content/Chat/Chat';
import {SECONDS_IN_MINUTE_VALUE} from '@steroidsjs/core/ui/content/Chat/constants/timeTemplatesAndUnits';
import {calculateMessageTimeAgo} from '@steroidsjs/core/ui/content/Chat/utils';

import './BubbleMessageView.scss';

interface IBubbleMessageProps {
    user: IChatUser;
    text: string;
    timestamp: string;
    timeAgo: string;
    isCurrentUser: boolean;
    isFirstMessage?: boolean;
    isLastMessage?: boolean;
    isTodayMessage?: boolean;
}

function BubbleMessageView(props: IBubbleMessageProps) {
    const bem = useBem('BubbleMessageView');

    const [timeAgo, setTimeAgo] = useState(props.timeAgo);

    useInterval(
        () => setTimeAgo(calculateMessageTimeAgo(props.timestamp)),
        props.isTodayMessage ? SECONDS_IN_MINUTE_VALUE : null,
    );

    return (
        <div className={bem.block({
            'another-user': !props.isCurrentUser,
            'last-message': !!props.isLastMessage,
        })}
        >
            <div className={bem.element('user-message')}>
                {!props.isCurrentUser && props.isFirstMessage && (
                    <Title
                        className={bem.element('username')}
                        type='h4'
                        tag='h4'
                        content={`${props.user.firstName} ${props.user.lastName}`}
                    />
                )}
                <Text
                    className={bem.element('text')}
                    type="body"
                    content={props.text}
                />
                <div className={bem.element('indicators')}>
                    <Text
                        className={bem.element('time')}
                        type="body3"
                        content={timeAgo}
                    />
                    {props.isCurrentUser && (
                        <Icon
                            className={bem.element('check')}
                            name="done-all"
                        />
                    )}
                </div>
            </div>
            {props.user && (
                <div className={bem.element('avatar')}>
                    <Avatar
                        src={props.user.avatar?.src}
                        title={`${props.user.firstName} ${props.user.lastName}`}
                        status={props.user.avatar?.status}
                        size='sm'
                    />
                </div>
            )}
        </div>
    );
}

export default memo(BubbleMessageView);
