import {ILocaleComponent} from '@steroidsjs/core/components/LocaleComponent';

export const getEndOfDay = (date: ReturnType<ILocaleComponent['dayjs']>) => date.hour(23).minute(59).second(59);

export const getCurrentWeek = (locale: ILocaleComponent) => {
    const today = locale.dayjs(new Date().toDateString());
    const dayOfWeek = today.day();
    const startDate = today.subtract(dayOfWeek === 0 ? 6 : dayOfWeek - 1, 'day');
    const finishDate = startDate.add(6, 'day');
    return {
        start: startDate,
        finish: getEndOfDay(finishDate),
    };
};

export const getCurrentMonth = (locale: ILocaleComponent) => {
    const today = locale.dayjs(new Date().toDateString());
    const startDate = today.startOf('month');
    const finishDate = today.endOf('month');
    return {
        start: startDate,
        finish: getEndOfDay(finishDate),
    };
};

export const getCurrentYear = (locale: ILocaleComponent) => {
    const today = locale.dayjs(new Date().toDateString());
    const startDate = today.startOf('year');
    const finishDate = today.endOf('year');
    return {
        start: startDate,
        finish: getEndOfDay(finishDate),
    };
};
