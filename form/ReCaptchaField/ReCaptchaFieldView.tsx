import * as React from 'react';
import {ReCaptcha} from 'react-recaptcha-v3';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IReCaptchaFieldViewProps} from '@steroidsjs/core/ui/form/ReCaptchaField/ReCaptchaField';

@bem('ReCaptchaFieldView')
export default class ReCaptchaFieldView extends React.PureComponent<IReCaptchaFieldViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <ReCaptcha
                    {...this.props.reCaptchaProps}
                    className={bem.element('captcha')}
                />
            </div>
        );
    }

}
