import {getCurrentMonth, getCurrentWeek, getCurrentYear, getEndOfDay, getPreviousMonth} from './utils';

export const RANGE_BUTTONS = {
    today: {
        label: __('Сегодня'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const today = locale.dayjs(new Date().toDateString());
            changeFrom(today.format(format));
            changeTo(getEndOfDay(today).format(format));
        },
    },
    yesterday: {
        label: __('Вчера'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const today = locale.dayjs(new Date().toDateString());
            const yesterday = today.subtract(1, 'day');
            changeFrom(yesterday.format(format));
            changeTo(yesterday.hour(23).minute(59).second(59).format(format));
        },
    },
    thisWeek: {
        label: __('Эта неделя'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const {start, finish} = getCurrentWeek(locale);
            changeFrom(start.format(format));
            changeTo(finish.format(format));
        },
    },
    lastWeek: {
        label: __('Прошлая неделя'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const {start, finish} = getCurrentWeek(locale);
            changeFrom(start.subtract(1, 'week').format(format));
            changeTo(finish.subtract(1, 'week').format(format));
        },
    },
    thisMonth: {
        label: __('Этот месяц'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const {start, finish} = getCurrentMonth(locale);
            changeFrom(start.format(format));
            changeTo(finish.format(format));
        },
    },
    lastMonth: {
        label: __('Прошлый месяц'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const {start, finish} = getPreviousMonth(locale);
            changeFrom(start.format(format));
            changeTo(finish.format(format));
        },
    },
    thisYear: {
        label: __('Этот год'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const {start, finish} = getCurrentYear(locale);
            changeFrom(start.format(format));
            changeTo(finish.format(format));
        },
    },
    lastYear: {
        label: __('Прошлый год'),
        onClick: (locale, changeFrom, changeTo, format) => {
            const {start, finish} = getCurrentYear(locale);
            changeFrom(start.subtract(1, 'year').format(format));
            changeTo(finish.subtract(1, 'year').format(format));
        },
    },
};
