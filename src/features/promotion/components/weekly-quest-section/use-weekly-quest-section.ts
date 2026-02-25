import { useEffect, useRef, useState} from 'react';

export function useWeeklyQuestSection() {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const preloadObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                        preloadObserver.unobserve(el);
                    }
                });
            },
            { rootMargin: '240px' } // preload
        );

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.15 }
        );

        preloadObserver.observe(el);
        io.observe(el);

        return () => {
            preloadObserver.disconnect();
            io.disconnect();
        };
    }, []);


    return {
        ref,
        isVisible,
        shouldLoad
    };
}