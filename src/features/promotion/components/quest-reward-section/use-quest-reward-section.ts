import {  useEffect, useRef, useState } from "react"
import rank2Img from "@feature/promotion/assets/quest-reward-section/rank-2.png"
import rank1Img from "@feature/promotion/assets/quest-reward-section/rank-1.png"
import rank3Img from "@feature/promotion/assets/quest-reward-section/rank-3.png"

export function useQuestRewardSection() {
    const ref = useRef<HTMLElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [shouldLoad, setShouldLoad] = useState(false)

    // Mobile order: 1, 2, 3 (top to bottom)
    // Desktop order: 2, 1, 3 (left, center, right)
    const rankData = [
        { id: 1, img: rank1Img, label: "Motor Vario", position: "center" },
        { id: 2, img: rank2Img, label: "Macbook Air M1 2020", position: "left" },
        { id: 3, img: rank3Img, label: "Samsung Galaxy Tab S7+", position: "right" },
    ]

    useEffect(() => {
        if (!ref.current) return
        const el = ref.current

        const preloadObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true)
                        preloadObserver.unobserve(el)
                    }
                })
            },
            { rootMargin: "200px" }
        )

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting)
                })
            },
            { threshold: 0.2 }
        )

        preloadObserver.observe(el)
        observer.observe(el)

        return () => {
            preloadObserver.disconnect()
            observer.disconnect()
        }
    }, [])

    return {
        rankData,
        ref,
        isVisible,
        shouldLoad
    }
}