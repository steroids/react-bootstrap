import {MutableRefObject, useRef} from 'react';
import {useMount, useUnmount} from 'react-use';

const onlyNumbersRegExp = /^\D/g;

/*
* Хук устанавливает padding-right для body при открытии модальных окон.
* Помогает избежать нежелательного смещения контента, когда для body задается свойство overflow: hidden (убирается скролл)
* */

const BODY_HIDE_SCROLL_CLASS_NAME = 'body-hide-scroll';

export default function useHideScroll() {
    const defaultPadding: MutableRefObject<string> = useRef(null);

    useMount(() => {
        if (process.env.IS_SSR) {
            return;
        }

        const fullWindowWidth = window.innerWidth; // полная ширина окна;
        const windowWidthWithoutScrollbar = document.documentElement.clientWidth; // ширина окна за вычетом скролла

        defaultPadding.current = document.body.style.paddingRight;

        if (windowWidthWithoutScrollbar < fullWindowWidth) {
            const defaultPaddingInt = defaultPadding.current
                ? Number(defaultPadding.current.replace(onlyNumbersRegExp, ''))
                : 0;
            const paddingRight = `${fullWindowWidth - windowWidthWithoutScrollbar + defaultPaddingInt}px`;
            document.body.style.paddingRight = paddingRight;
            document.body.classList.add(BODY_HIDE_SCROLL_CLASS_NAME);
        }
    });

    useUnmount(() => {
        if (process.env.IS_SSR) {
            return;
        }
        document.body.style.paddingRight = defaultPadding.current;
        document.body.classList.remove(BODY_HIDE_SCROLL_CLASS_NAME);
    });
}
