import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {useLeaderboardSection} from "./use-leaderboard-section"
import podiumImg  from "@feature/promotion/assets/leaderboard-section/podium.png"
import iconTimeImg  from "@feature/promotion/assets/leaderboard-section/icon-time.png"
import styles from './leaderboard-section.module.css';
import {Card, CardContent} from "@shared/components/ui/card.tsx";
import {getSrc} from "@feature/promotion/utils";

export function LeaderboardSection() {
    const {
        ref,
        isVisible,
        shouldLoad,
        rankData,
        formatCurrency
    } = useLeaderboardSection()

    const itemVariant: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    }

    const map = Object.fromEntries(rankData.map((r) => [r.id, r]))

    return (
        <section
            ref={ref}
            className="leaderboard-section py-20"
        >
            <div className="container mx-auto px-4">

                {/* TITLE */}
                <div className="text-center mb-16">
                    <span className="text-3xl md:text-4xl font-bold uppercase border-b-16 border-blue-600">
                        LEADERBOARD SAAT INI
                    </span>
                </div>

                {/* EXPIRED CARD */}
                <div className="mb-40 flex justify-center">
                    <Card className="w-full md:w-[60%]">
                        <CardContent className="flex items-center gap-3 py-3 px-4">
                            <img
                                src={getSrc(iconTimeImg)}
                                alt="Time"
                                loading="lazy"
                                className="object-contain"
                                width={32}
                                height={32}
                            />
                            <div>
                                <div className="text-lg text-gray-500">Expired</div>
                                <div className="text-base text-gray-400">Periode berakhir</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RANKS */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-10">

                        {/* render in mobile-first order */}
                        {[1, 2, 3].map((pos) => {
                            const item = map[pos]
                            if (!item) return null

                            const isRank1 = item.id === 1
                            const entranceDelay =
                                item.id === 1 ? 0 :
                                    item.id === 2 ? 0.4 : 0.8

                            const orderClass = item.id === 1
                                ? "order-1 md:order-2"
                                : item.id === 2
                                    ? "order-2 md:order-1"
                                    : "order-3 md:order-3"
                            const positionItemClass = item.id === 1
                                ? "items-center"
                                : item.id === 2
                                    ? "items-center md:items-end"
                                    : "items-center md:items-start"

                            return (
                                <motion.div
                                    key={item.id}
                                    custom={entranceDelay}
                                    variants={itemVariant}
                                    initial="hidden"
                                    animate={isVisible ? "visible" : "hidden"}
                                    whileHover={{ scale: 1.1 }}
                                    className={`
                                        w-full md:w-72 relative
                                        ${isRank1 ? "md:-translate-y-8" : ""}
                                        ${orderClass}
                                        ${positionItemClass}
                                      `}
                                >
                                    {/* OUT-OF-BOX IMAGE */}
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                                        {shouldLoad ? (
                                            <motion.img
                                                src={getSrc(item.image)}
                                                alt={item.title}
                                                loading="lazy"
                                                className={`object-contain ${isRank1 ? "w-40 md:w-52" : "w-32 md:w-40"}`}
                                                animate={{ y: [-6, 6, -6] }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ) : (
                                            <div className="w-40 h-32 bg-gray-200 animate-pulse rounded-lg" />
                                        )}
                                    </div>

                                    {/* CARD */}
                                    <Card className={`pt-30 pb-10 text-center relative ${styles.cardBackground || ''}`}>
                                        <CardContent>
                                            <div className="font-semibold text-lg text-white">{item.title}</div>
                                            <div className="text-green-500 font-bold text-xl mt-2">
                                                {formatCurrency(item.capital)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}

                    </div>
                </div>

                {/* PODIUM IMAGE BELOW RANKS */}
                <div className="mb-10 flex justify-center">
                    {shouldLoad ? (
                        <img
                            src={getSrc(podiumImg)}
                            alt="Podium"
                            loading="lazy"
                            className="w-full max-w-4xl object-contain"
                        />
                    ) : (
                        <div className="w-full max-w-4xl h-40 bg-gray-200 animate-pulse rounded-lg" />
                    )}
                </div>

                {/* BUTTON */}
                <div className="flex justify-center">
                    <a
                        href="https://triv.co.id/id/tradingfest/leaderboard"
                        className="w-full md:w-40 inline-flex justify-center md:justify-start items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center md:text-left rounded-md font-semibold shadow"
                        role="button"
                    >
                        Lihat Semua &gt;
                    </a>
                </div>

            </div>
        </section>
    )
}