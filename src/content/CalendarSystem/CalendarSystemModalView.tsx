import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';

import './CalendarSystemModalView.scss';
import Modal from '@steroidsjs/core/ui/modal/Modal';
import {ICalendarSystemModalViewProps} from '@steroidsjs/core/ui/content/CalendarSystem/CalendarSystem';

export default function CalendarSystemModalView(props: ICalendarSystemModalViewProps) {
    const bem = useBem('CalendarSystemModalView');

    return (
        <Modal
            title={__('New Event')}
            onClose={props.onClose}
        />
    );
}
