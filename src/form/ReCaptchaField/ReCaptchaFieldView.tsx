import * as React from 'react';

import {IReCaptchaFieldViewProps} from '@steroidsjs/core/ui/form/ReCaptchaField/ReCaptchaField';
import {useBem} from '@steroidsjs/core/hooks';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReCaptchaFieldView(props: IReCaptchaFieldViewProps) {
    const bem = useBem('ReCaptchaFieldView');

    return (
        <div
            className={bem(
                bem.block(),
                props.className,
            )}
            style={props.style}
        >
            <ReCAPTCHA
                {...props.recaptchaOptions}
            />
        </div>
    );
}
