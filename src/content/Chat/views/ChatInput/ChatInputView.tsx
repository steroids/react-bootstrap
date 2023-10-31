import React, {useCallback} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Button, Form, InputField} from '@steroidsjs/core/ui/form';

import './ChatInputView.scss';

interface IChatInputProps {
    chatId: string;
    onSendMessage: (data) => void;
}

export default function ChatInputView(props: IChatInputProps) {
    const bem = useBem('ChatInputView');

    const renderInputActions = useCallback(() => (
        <div className={bem.element('actions')}>
            <Button
                className={bem.element('action')}
                icon="send"
                type="submit"
            />
        </div>
    ), [bem]);

    return (
        <div className={bem.block()}>
            <Form
                formId={props.chatId}
                className={bem.element('form')}
                onSubmit={props.onSendMessage}
                useRedux
            >
                <InputField
                    className={bem.element('input')}
                    attribute="text"
                    size="lg"
                    required
                    placeholder={__('Введите сообщение')}
                    addonAfter={renderInputActions()}
                />
            </Form>
        </div>
    );
}
