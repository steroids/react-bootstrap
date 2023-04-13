import * as React from 'react';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IReCaptchaFieldViewProps} from '@steroidsjs/core/ui/form/ReCaptchaField/ReCaptchaField';
import {useBem} from '@steroidsjs/core/hooks';
import {Link} from '@steroidsjs/core/ui/nav';

export default function ReCaptchaFieldView(props: IReCaptchaFieldViewProps & IBemHocOutput) {
    const bem = useBem('ReCaptchaFieldView');

    return (
        <div className={bem.block()}>
            <small className='text-muted'>
                {__('This site is protected by reCAPTCHA and the Google') + ' '}
                <Link
                    url='https://policies.google.com/privacy'
                    target='_blank'
                    label={__('Privacy Policy')}
                />
                {' ' + __('and') + ' '}
                <Link
                    url='https://policies.google.com/terms'
                    target='_blank'
                    label={__('Terms of Service')}
                />
                {' ' + __('apply')}
                .
            </small>
        </div>
    );
}
