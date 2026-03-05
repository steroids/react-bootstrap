import {useBem} from '@steroidsjs/core/hooks';
import {Button, Form, InputField} from '@steroidsjs/core/ui/form';
import Modal from '@steroidsjs/core/ui/modal/Modal';
import {ITwoFactorModalViewProps} from '@steroidsjs/core/ui/modal/TwoFactorModal/TwoFactorModal';
import React from 'react';

export default function TwoFactorModalView(props: ITwoFactorModalViewProps) {
    const bem = useBem('TwoFactorModalView');
    return (
        <Modal {...props}>
            <div className={bem.block()}>
                <Form {...props.formProps}>
                    <p>
                        {props.description}
                    </p>
                    <InputField
                        attribute='code'
                        label={__('Код подтверждения')}
                    />
                    <Button
                        type='submit'
                        label={__('Отправить')}
                    />
                </Form>
            </div>
        </Modal>
    );
}
