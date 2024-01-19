import React, {useCallback, useEffect, useRef} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IChatViewProps} from '@steroidsjs/core/ui/content/Chat/Chat';

import BubblesDateGroup from './views/BubblesDateGroup';

export default function ChatView(props: IChatViewProps) {
    const bem = useBem('ChatView');

    // Scroll to bottom on new message
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const prevContentHeightRef = useRef(null);
    useEffect(() => {
        const wrapperHeight = wrapperRef.current.clientHeight;
        const contentHeight = contentRef.current.clientHeight;
        const wrapperScrollTop = wrapperRef.current.scrollTop;

        if (!prevContentHeightRef.current || wrapperScrollTop === prevContentHeightRef.current - wrapperHeight) {
            wrapperRef.current.scrollTo({
                top: contentHeight - wrapperHeight,
                left: 0,
                behavior: prevContentHeightRef.current ? 'smooth' : 'auto',
            });
        }

        prevContentHeightRef.current = contentHeight;
    }, [props.groupedMessagesByDates]);

    const renderChatScreen = useCallback(() => (
        <div className={bem.element('screen')}>
            <div
                className={bem.element('wrapper')}
                ref={wrapperRef}
            >
                <div
                    className={bem.element('content')}
                    ref={contentRef}
                >
                    {Object.entries(props.groupedMessagesByDates)
                        .map(([date, groupedMessages]) => (
                            <BubblesDateGroup
                                key={date}
                                date={date}
                                groupedMessages={groupedMessages}
                                currentUser={props.currentUser}
                            />
                        ))}
                </div>
            </div>
        </div>
    ), [bem, props.groupedMessagesByDates, props.currentUser]);

    return (
        <div className={bem.block()}>
            {renderChatScreen()}
            {props.renderChatInput()}
        </div>
    );
}
