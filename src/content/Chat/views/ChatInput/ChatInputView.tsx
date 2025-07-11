import {forwardRef, useCallback, useRef} from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {FileField, Form, InputField} from '@steroidsjs/core/ui/form';
import {IChatInputViewProps} from '@steroidsjs/core/ui/content/Chat/Chat';

import ButtonView from '../../../../form/Button/ButtonView';
import ChatFileItemView from '../ChatFileItem';
import './ChatInputView.scss';

const HiddenUploadFileButton = forwardRef<HTMLButtonElement, any>((props, ref) => (
    <button
        type='button'
        ref={ref}
        {...props}
    />
));

export default function ChatInputView(props: IChatInputViewProps) {
    const bem = useBem('ChatInputView');

    const filePickerRef = useRef(null);

    const onBrowseFile = useCallback((e) => {
        e.preventDefault();
        filePickerRef.current.click();
    }, [filePickerRef]);

    const renderInputActions = useCallback(() => (
        <div className={bem.element('actions')}>
            <ButtonView
                className={bem.element('action')}
                icon="clip"
                onClick={onBrowseFile}
                type='button'
            />
            <ButtonView
                className={bem.element('action')}
                icon='send'
                type='submit'
            />
        </div>
    ), [bem, onBrowseFile]);

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
                    attribute='text'
                    size='lg'
                    placeholder={props.inputPlaceholder}
                    addonAfter={renderInputActions()}
                />
                <FileField
                    className={bem.element('files')}
                    attribute='filesId'
                    itemView={ChatFileItemView}
                    buttonView={HiddenUploadFileButton}
                    buttonProps={{
                        ref: filePickerRef,
                    }}
                    multiple={false}
                    showRemove
                    onChange={props.onUploadFiles}
                    {...props.fileFieldProps}
                />
            </Form>
        </div>
    );
}
