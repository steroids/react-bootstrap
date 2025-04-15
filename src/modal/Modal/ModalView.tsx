import * as React from 'react';
import Modal from 'react-modal';
import {useBem} from '@steroidsjs/core/hooks';
import {IModalViewProps} from '@steroidsjs/core/ui/modal/Modal/Modal';
import {Icon} from '@steroidsjs/core/ui/content';
import {Button} from '@steroidsjs/core/ui/form';
import {useHideScroll} from '../../hooks';

export default function ModalView(props: IModalViewProps) {
    const bem = useBem('ModalView');

    useHideScroll();

    const overrideDefaultClasses = {
        base: bem.block('overlay'),
        afterOpen: 'ModalView_overlay-after',
        beforeClose: 'ModalView_overlay-before',
    };
    return (
        <Modal
            {...props}
            ariaHideApp={false}
            className={bem(bem.element('body', {size: props.size}), props.className)}
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
                <Icon
                    name='cross_12x12'
                    className={bem.element('close')}
                    onClick={props.onClose}
                />
            </div>
            <div className={bem.element('content')}>
                {props.children}
            </div>
            {props.buttons && (
                <div className={bem.element('footer')}>
                    {props.buttons.map((button, buttonIndex) => (
                        <Button
                            key={buttonIndex}
                            size={props.size}
                            {...button}
                        />
                    ))}
                </div>
            )}
        </Modal>
    );
}
