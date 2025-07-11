import {IPaginationSizeViewProps} from '@steroidsjs/core/ui/list/PaginationSize/PaginationSize';
import {useBem} from '@steroidsjs/core/hooks';
import ButtonGroup from '@steroidsjs/core/ui/nav/ButtonGroup';

export default function PaginationSizeView(props: IPaginationSizeViewProps) {
    const bem = useBem('PaginationSizeView');

    return (
        <div className={bem(props.className, bem.block())}>
            <ButtonGroup
                items={props.items}
                onClick={props.onSelect}
                activeButton={props.defaultValue}
                buttonProps={props.buttonProps}
            />
        </div>
    );
}
