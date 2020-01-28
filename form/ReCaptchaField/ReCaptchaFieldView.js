import React from 'react';
import PropTypes from 'prop-types';
import ReCaptcha from 'react-google-recaptcha';

import {bem} from '@steroidsjs/core/hoc';

@bem('ReCaptchaFieldView')
export default class ReCaptchaFieldView extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        reCaptchaProps: PropTypes.object,
    };

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
