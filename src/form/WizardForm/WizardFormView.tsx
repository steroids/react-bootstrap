import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import {IWizardFormViewProps} from '@steroidsjs/core/ui/form/WizardForm/WizardForm';
import Steps from '@steroidsjs/core/ui/list/Steps/Steps';
import {Button} from '@steroidsjs/core/ui/form';
import TitleView from '../../typography/Title/TitleView';

export default function WizardFormView(props: IWizardFormViewProps) {
    const bem = useBem('WizardFormView');

    return (
        props.renderStep(
            <div className={bem.element('header')}>
                {props.showSteps && (
                    <Steps
                        {...props.stepsProps}
                        className={bem.element('steps')}
                        stepItems={props.stepItems ?? props.totalSteps}
                        currentStep={props.currentStep}
                    />
                )}
                {props.stepTitle && (
                    <TitleView
                        type='h3'
                        content={props.stepTitle}
                        className={bem.element('title')}
                    />
                )}
            </div>,
            <div className={bem.element('buttons')}>
                {props.currentStep > 0 && (
                    <Button
                        {...props.prevStepButtonProps}
                        onClick={props.onPrevStep}
                    />
                )}
                <Button
                    type='submit'
                    {...props.nextStepButtonProps}
                />
            </div>,
            {
                className: bem.block(),
            },
        )
    );
}
