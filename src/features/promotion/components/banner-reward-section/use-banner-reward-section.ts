import { useEffect, useRef, useState} from 'react';

export function useBannerRewardSection({
    root = null,
    rootMargin = '200px',
    threshold = 0.15,
}: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
} = {}) {
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
            { root, rootMargin }
        );
        preloadObserver.observe(el);

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting && entry.intersectionRatio >= threshold);
                });
            },
            { root, rootMargin: '0px', threshold }
        );
        io.observe(el);

        return () => {
            io.disconnect();
            preloadObserver.disconnect();
        };
    }, [root, rootMargin, threshold]);


    return {
        ref,
        isVisible,
        shouldLoad
    };
}