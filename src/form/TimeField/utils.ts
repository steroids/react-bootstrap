import _padStart from 'lodash-es/padStart';

/** 'HH:mm' -> minutes from start of day */
export const timeToMinutes = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
};

export const isHourAvailable = (
    hour: string,
    from?: string,
    to?: string,
): boolean => {
    const h = Number(hour);
    const fromMin = from ? timeToMinutes(from) : 0;
    const toMin = to ? timeToMinutes(to) : 24 * 60 - 1;

    const hourStart = h * 60;
    const hourEnd = h * 60 + 59;

    return !(hourEnd < fromMin || hourStart > toMin);
};

/** clamp value into range */
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const getMinuteRange = (
    fromMin: number,
    toMin: number,
    step = 1,
): number[] => {
    const result: number[] = [];

    for (let m = fromMin; m <= toMin; m += step) {
        result.push(m);
    }

    return result;
};

export const getAvailableHours = (
    from?: string,
    to?: string,
): string[] => {
    const result: string[] = [];

    const fromMin = from ? timeToMinutes(from) : 0;
    const toMin = to ? timeToMinutes(to) : 24 * 60 - 1;

    const startHour = Math.floor(fromMin / 60);
    const endHour = Math.floor(toMin / 60);

    for (let h = startHour; h <= endHour; h += 1) {
        result.push(_padStart(h, 2, '0'));
    }

    return result;
};

export const getAvailableMinutes = (
    hour: string,
    options?: {
        from?: string,
        to?: string,
        step?: number,
    },
): string[] => {
    const h = Number(hour);
    const step = options?.step ?? 1;

    const fromMin = options?.from ? timeToMinutes(options.from) : 0;
    const toMin = options?.to ? timeToMinutes(options.to) : 24 * 60 - 1;

    const hourStart = h * 60;

    const startMinute = clamp(
        fromMin - hourStart,
        0,
        59,
    );

    const endMinute = clamp(
        toMin - hourStart,
        0,
        59,
    );

    return getMinuteRange(startMinute, endMinute, step)
        .map((m) => _padStart(m, 2, '0'));
};

export const normalizeMinutesForHour = (
    hour: string,
    minute: string,
    options?: {
        from?: string,
        to?: string,
        step?: number,
    },
): string => {
    const available = getAvailableMinutes(hour, options);

    // если минут вообще нет (на всякий случай)
    if (!available.length) {
        return minute;
    }

    // если текущая минута валидна — оставляем
    if (available.includes(minute)) {
        return minute;
    }

    // иначе берём ближайшую допустимую (обычно первую)
    return available[0];
};
