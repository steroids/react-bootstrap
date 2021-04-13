import * as React from 'react';
import {ReCaptcha} from 'react-recaptcha-v3';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IReCaptchaFieldViewProps} from '@steroidsjs/core/ui/form/ReCaptchaField/ReCaptchaField';
import {useBem} from '@steroidsjs/core/hooks';

export default function ReCaptchaFieldView(props: IReCaptchaFieldViewProps & IBemHocOutput) {
    const bem = useBem('ReCaptchaFieldView');
    return (
        <div className={bem.block()}>
            <ReCaptcha
                {...props.reCaptchaProps}
                className={bem.element('captcha')}
            />
        </div>
    );
}
