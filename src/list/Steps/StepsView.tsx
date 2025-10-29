import {IStepsViewProps} from '@steroidsjs/core/ui/list/Steps/Steps';
import {useBem} from '@steroidsjs/core/hooks';

export default function StepsView(props: IStepsViewProps) {
    const bem = useBem('StepsView');
    return (
        <div className={bem(props.className, bem.block())}>
            {props.children}
        </div>
    );
}
