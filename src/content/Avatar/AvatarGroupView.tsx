import React, {useState, isValidElement} from 'react';
import { useBem } from '@steroidsjs/core/hooks';
import { IAvatarGroupViewProps } from '@steroidsjs/core/ui/content/Avatar/AvatarGroup'

import './AvatarGroupView.scss';

export default function Avatar (props: IAvatarGroupViewProps) {
    const bem = useBem('AvatarGroupView');

  //   const childrenWithProps = (props.children).map((child, index) =>
    
  // );;
    
    // if (props.maxCount && props.maxCount < count) {
    //     const childrenShow = childrenWithProps.slice(0, props.maxCount);
    //     const childrenHidden = childrenWithProps.slice(props.maxCount, count);
    //     childrenShow.push(
    //       <div>
    //         <Avatar /*style={maxStyle}*/>{`+${count - props.maxCount}`}</Avatar>
    //       </div>
    //     );
    //     return (
    //         <div /*{className={cls}}*/ style={props.style}>
    //           {childrenShow}
    //         </div>
    //     );
    //   }

    return(
        <div className={bem.block()}>
            {props.children}
        </div>
    )
}