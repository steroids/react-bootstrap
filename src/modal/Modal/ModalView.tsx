import * as React from 'react';
import Modal from 'react-modal';

import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {IModalViewProps} from '@steroidsjs/core/ui/modal/Modal/Modal';
import Controls from '@steroidsjs/core/ui/nav/Controls';
import {useBem} from '@steroidsjs/core/hooks';

export default function ModalView(props: IModalViewProps & IBemHocOutput) {
    const bem = useBem('ModalView');
    const overrideDefaultClasses = {
        base: bem.block('overlay'),
        afterOpen: bem.block('overlay-after'),
        beforeClose: bem.block('overlay-before'),
    };
    return (
        <div>
            <Modal
                {...props}
                isOpen={!props.isClosing}
                closeTimeoutMS={200}
                overlayClassName={overrideDefaultClasses}
                className={bem.element('body', {size: props.size})}
                bodyOpenClassName={bem.block('body-opened')}
                ariaHideApp={false}
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
                            items={props.controls}
                            className={bem.element('controls')}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}
