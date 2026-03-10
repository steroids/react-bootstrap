import useBem from '@steroidsjs/core/hooks/useBem';
import {IChatUser} from '@steroidsjs/core/ui/content/Chat/Chat';
import {IGroupedMessage} from '@steroidsjs/core/ui/content/Chat/hooks/useChat';
import {calculateMessageTimeAgo, isTodayMessage} from '@steroidsjs/core/ui/content/Chat/utils';
import React, {memo, useCallback} from 'react';

import BubbleMessageView from '../BubbleMessage';

import './BubblesDateGroup.scss';

interface IBubblesDateGroupProps {
    date: string,
    groupedMessages: IGroupedMessage[][],
    currentUser: IChatUser,
}

function BubblesDateGroup(props: IBubblesDateGroupProps) {
    const bem = useBem('BubblesDateGroup');

    const toBubbles = useCallback((groupedMessages) => (
        <div className={bem.element('bubbles')}>
            {groupedMessages.map((bubbleMessage) => (
                <BubbleMessageView
                    key={bubbleMessage.id}
                    user={bubbleMessage.user}
                    text={bubbleMessage.text}
                    files={bubbleMessage.files}
                    timestamp={bubbleMessage.timestamp}
                    timeAgo={calculateMessageTimeAgo(bubbleMessage.timestamp)}
                    isTodayMessage={isTodayMessage(bubbleMessage.timestamp)}
                    isCurrentUser={bubbleMessage.user.id === props.currentUser.id}
                    isFirstMessage={bubbleMessage.isFirstMessage}
                    isLastMessage={bubbleMessage.isLastMessage}
                />
            ))}
        </div>
    ), [bem, props.currentUser.id]);

    const renderDate = useCallback(() => (
        <>
            <div className={bem.element('date')}>
                <div className={bem.element('date-wrapper')}>
                    <span className={bem.element('date-text')}>
                        {props.date}
                    </span>
                </div>
            </div>
            <div className={bem.element('date', 'invisible-date')}>
                <div className={bem.element('date-wrapper', 'invisible-date')}>
                    {props.date}
                </div>
            </div>
        </>
    ), [bem, props.date]);

    return (
        <div className={bem.block()}>
            {renderDate()}
            {props.groupedMessages?.map(toBubbles)}
        </div>
    );
}

export default memo(BubblesDateGroup);
