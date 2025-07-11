import {useBem} from '@steroidsjs/core/hooks';
import Format from '@steroidsjs/core/ui/format/Format';
import {ITreeColumnViewProps} from '@steroidsjs/core/ui/list/TreeTable/TreeTable';
import TreeItemView from '../../../../nav/TreeItem/TreeItemView';

export default function TreeColumnView(props: ITreeColumnViewProps) {
    const bem = useBem('TreeColumnView');

    const renderFormat = () => (
        <Format
            {...props}
            {...(props.formatter || {})}
            attribute={props.attribute}
        />
    );

    const renderValue = () => (
        <span className={bem.element('value')}>
            {renderFormat()}
        </span>
    );

    return (
        <TreeItemView
            item={props.item}
            levelPadding={props.levelPadding}
        >
            {renderValue()}
        </TreeItemView>
    );
}
