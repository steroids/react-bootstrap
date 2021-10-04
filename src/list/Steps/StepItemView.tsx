import * as React from "react";
import Icon from '@steroidsjs/core/ui/icon/Icon';

import { useBem } from "@steroidsjs/core/hooks";
import {IStepItemViewProps} from "@steroidsjs/core/ui/list/Steps/Steps";

export default function StepItemView(props: IStepItemViewProps) {
	const bem = useBem("StepItemView");
	return (
		<div className={bem(props.className, bem.block({[props.status]: true}))}>
			<div className={bem.element('body', {disabled: props.disabled})} onClick={props.onChange}>
				<div className={bem.element('header')}>
					<span className={bem.element('icon')}>
						{props.status === 'finish' ? <Icon name={'check'} /> : props.stepItem.icon || `0${props.index}`}
					</span>
					<div>
						<div className={bem.element('title')}>
							{props.stepItem.title}
						</div>
						<div className={bem.element('subtitle')}>
							{props.stepItem.subtitle}
						</div>
					</div>
				</div>
				<div className={bem.element('description')}>
					{props.stepItem.description}
				</div>
			</div>
			<span className={bem.element('divider')} />
		</div>
	);
}
