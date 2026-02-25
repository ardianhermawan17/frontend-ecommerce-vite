import { useEffect, useRef, useState } from "react";
import rank1Img from "@feature/promotion/assets/leaderboard-section/rank-1.png";
import rank2Img from "@feature/promotion/assets/leaderboard-section/rank-2.png";
import rank3Img from "@feature/promotion/assets/leaderboard-section/rank-3.png";
import {convertCurrency} from "@shared/utils";

export type LeaderboardItem = {
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    title: string;
    capital: number;
};

export function useLeaderboardSection() {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);

    // default mock data (you can replace with fetch)
    const rankData: LeaderboardItem[] = [
        { id: 1, image: rank1Img, title: "Riana", capital: 9876543210 },
        { id: 2, image: rank2Img, title: "Johnson", capital: 1234567890 },
        { id: 3, image: rank3Img, title: "Mireska", capital: 956789012 },
    ];

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
            { rootMargin: "240px" }
        );

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.18 }
        );

        preloadObserver.observe(el);
        io.observe(el);

        return () => {
            preloadObserver.disconnect();
            io.disconnect();
        };
    }, []);

    const formatCurrency = (n: number) => {
        if (!Number.isFinite(n)) return "";

        const customFormatter = (val: number) => {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val);
        }
        if (n >= 1_000_000_000) {
            const val = n / 1_000_000_000;
            const formatted = customFormatter(val);
            return `${formatted} M`;
        }

        if (n >= 1_000_000) {
            const val = n / 1_000_000;
            const formatted = customFormatter(val);
            return `${formatted} JT`;
        }

        return convertCurrency(n, "indonesia");
    };

    return {
        ref,
        isVisible,
        shouldLoad,
        rankData,
        formatCurrency
    };
}