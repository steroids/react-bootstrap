import React, {useCallback, useRef} from 'react';
import {useUpdateEffect} from 'react-use';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IChatViewProps} from '@steroidsjs/core/ui/content/Chat/Chat';

import ChatInputView from './views/ChatInput';
import BubblesDateGroup from './views/BubblesDateGroup';

export default function ChatView(props: IChatViewProps) {
    const bem = useBem('ChatView');

    const endOfMessagesRef = useRef(null);

    useUpdateEffect(() => {
        endOfMessagesRef?.current.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
    }, [props.bubbleMessagesByDates]);

    const renderChatScreen = useCallback(() => (
        <div className={bem.element('screen')}>
            <div className={bem.element('content')}>
                {Object.entries(props.bubbleMessagesByDates)
                    .map(([date, bubbleMessagesByDate]) => (
                        <BubblesDateGroup
                            key={date}
                            date={date}
                            bubbleMessagesByDate={bubbleMessagesByDate}
                            currentUser={props.currentUser}
                        />
                    ))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    ), [bem, props.bubbleMessagesByDates, props.currentUser]);

    return (
        <div className={bem.block()}>
            {renderChatScreen()}
            <ChatInputView
                chatId={props.chatId}
            />
        </div>
    );
}
