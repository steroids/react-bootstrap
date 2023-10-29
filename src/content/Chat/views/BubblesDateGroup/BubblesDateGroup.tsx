import React, {memo, useCallback} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {calculateMessageTimeAgo} from '@steroidsjs/core/ui/content/Chat/utils';
import {IBubbleMessage} from '@steroidsjs/core/ui/content/Chat/hooks/useChat';
import {IChatUser} from '@steroidsjs/core/ui/content/Chat/Chat';

import BubbleMessageView from '../BubbleMessage';
import './BubblesDateGroup.scss';

interface IBubblesDateGroupProps {
    date: string;
    bubbleMessagesByDate: IBubbleMessage[][];
    currentUser: IChatUser;
}

function BubblesDateGroup(props: IBubblesDateGroupProps) {
    const bem = useBem('BubblesDateGroup');

    const toBubbles = useCallback((bubbleMessages, index) => (
        <div className={bem.element('bubbles')}>
            {bubbleMessages.map((bubbleMessage) => (
                <BubbleMessageView
                    key={bubbleMessage.id}
                    user={bubbleMessage.user}
                    text={bubbleMessage.text}
                    timeAgo={calculateMessageTimeAgo(bubbleMessage.timestamp)}
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
            {props.bubbleMessagesByDate?.map(toBubbles)}
        </div>
    );
}

export default memo(BubblesDateGroup);
