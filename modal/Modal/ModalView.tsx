import * as React from 'react';
import Modal from 'react-modal';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IModalViewProps} from '@steroidsjs/core/ui/modal/Modal/Modal';

@bem('ModalView')
export default class ModalView extends React.PureComponent<IModalViewProps & IBemHocOutput> {

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <Modal
                    isOpen={true}
                    overlayClassName={bem.element('overlay')}
                    ariaHideApp={false}
                    {...this.props}
                    className={bem(
                        bem.element('modal'),
                        this.props.className
                    )}
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
                    </div>
                </Modal>
            </div>
        );
    }

}
