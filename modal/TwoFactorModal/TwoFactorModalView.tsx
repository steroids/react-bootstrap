import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import Modal from '@steroidsjs/core/ui/modal/Modal';
import {Button, Form, InputField} from '@steroidsjs/core/ui/form';
import {ITwoFactorModalViewProps} from '@steroidsjs/core/ui/modal/TwoFactorModal/TwoFactorModal';

import './TwoFactorModalView.scss';

@bem('TwoFactorModalView')
export default class TwoFactorModalView extends React.PureComponent<ITwoFactorModalViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <Modal {...this.props}>
                <div className={bem.block()}>
                    <Form {...this.props.formProps}>
                        <p>
                            {this.props.description}
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
}
