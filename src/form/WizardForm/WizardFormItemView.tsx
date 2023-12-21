import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IWizardFormItemViewProps} from '@steroidsjs/core/ui/form/WizardForm/WizardForm';

export default function WizardFormItemView(props: IWizardFormItemViewProps) {
    const bem = useBem('WizardFormItemView');

    return (
        <div className={bem.block()}>
            {props.children}
        </div>
    );
}
