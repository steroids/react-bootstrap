export const getFormattedExpandLabel = (rest: any[] | number) => {
    const restNumber = Array.isArray(rest) ? rest.length : rest;

    return `${__('Показать ещё')} +${restNumber}`;
};
