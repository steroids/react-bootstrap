import * as React from 'react';
import Modal from 'react-modal';
import {useBem} from '@steroidsjs/core/hooks';
import Controls from '@steroidsjs/core/ui/nav/Controls';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IModalViewProps} from '@steroidsjs/core/ui/modal/Modal/Modal';

export default function ModalView(props: IModalViewProps & IBemHocOutput) {
    const bem = useBem('ModalView');
    const overrideDefaultClasses = {
        base: bem.block('overlay'),
        afterOpen: 'ModalView_overlay-after',
        beforeClose: 'ModalView_overlay-before',
    };
    return (
        <Modal
            {...props}
            ariaHideApp={false}
            bodyOpenClassName='ModalView_body-hide-scroll'
            className={bem.element('body', {size: props.size})}
            closeTimeoutMS={props.closeTimeoutMs}
            isOpen={!props.isClosing}
            onRequestClose={props.onClose}
            overlayClassName={overrideDefaultClasses}
            shouldCloseOnEsc={props.shouldCloseOnEsc}
            shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
        >
            <div className={bem.element('header')}>
                <span className={bem.element('title')}>
                    {props.title}
                </span>
                <button
                    className={bem.element('close')}
                    onClick={e => {
                        e.preventDefault();
                        props.onClose();
                    }}
                    aria-label={__('Закрыть')}
                />
            </div>
            <div className={bem.element('content')}>
                {props.children}
            </div>
            {props.controls && (
                <div className={bem.element('footer')}>
                    <Controls
                        className={bem.element('controls')}
                        items={props.controls}
                    />
                </div>
            )}
        </Modal>
    );
}
