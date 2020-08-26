import * as React from 'react';
import Modal from 'react-modal';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IModalViewProps} from '@steroidsjs/core/ui/modal/Modal/Modal';
import Controls from '@steroidsjs/core/ui/nav/Controls';

@bem('ModalView')
export default class ModalView extends React.PureComponent<IModalViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        const overrideDefaultClasses = {
            base: bem.block('overlay'),
            afterOpen: bem.block('overlay-after'),
            beforeClose: bem.block('overlay-before')
        }
        return (
            <div>
                <Modal
                    {...this.props}
                    isOpen={!this.props.isClosing}
                    closeTimeoutMS={200}
                    overlayClassName={overrideDefaultClasses}
                    className={bem.element('body')}
                    bodyOpenClassName={bem.block('body-opened')}
                    ariaHideApp={false}
                >
                    <div className={bem.element('inner')}>
                        <div className={bem.element('header')}>
                            <span className={bem.element('title')}>
                                {this.props.title}
                            </span>
                            <a
                                className={bem.element('close')}
                                href='#'
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.onClose();
                                }}
                            />
                        </div>
                        <div className={bem.element('content')}>
                            {this.props.children}
                        </div>
                        {this.props.controls && (
                            <div className={bem.element('footer')}>
                                <Controls
                                    items={this.props.controls}
                                    className={bem.element('controls')}
                                />
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        );
    }

}
