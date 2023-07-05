import * as React from 'react';

import {IReCaptchaFieldViewProps} from '@steroidsjs/core/ui/form/ReCaptchaField/ReCaptchaField';
import {useBem, useTheme} from '@steroidsjs/core/hooks';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReCaptchaFieldView(props: IReCaptchaFieldViewProps) {
    const bem = useBem('ReCaptchaFieldView');
    const {theme} = useTheme();

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
                theme={theme}
            />
        </div>
    );
}
