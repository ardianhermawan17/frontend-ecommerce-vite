import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useQuestRewardSection } from "@feature/promotion/components/quest-reward-section/use-quest-reward-section.ts"
import {getSrc} from "@feature/promotion/utils";

export function QuestRewardSection() {
    const {
        ref,
        isVisible,
        shouldLoad,
        rankData
    } = useQuestRewardSection()

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

    return (
        <section
            ref={ref}
            className="quest-reward-section mt-8 py-20"
            aria-label="Trive Quest Reward"
        >
            <div className="container mx-auto px-4">

                {/* TITLE */}
                <div className="text-center mb-32">
                    <span className="text-3xl md:text-4xl font-bold uppercase border-b-[16px] border-blue-600">
                        TRIV QUEST REWARD
                    </span>
                </div>

                {/* REWARD ITEMS */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-10">

                    {rankData.map((item) => {
                        const isRank1 = item.id === 1
                        const isRank2 = item.id === 2
                        const isRank3 = item.id === 3

                        // Custom entrance order: Rank 1 first, Rank 2 second, Rank 3 last
                        const entranceOrder = (item.id - 1) * 0.3

                        return (
                            <motion.div
                                key={item.id}
                                custom={entranceOrder}
                                variants={itemVariant}
                                initial="hidden"
                                animate={isVisible ? "visible" : "hidden"}
                                whileHover={{ scale: 1.1 }}
                                className={`
                                    flex flex-col 
                                    ${isRank1 ? "items-center" : ""}
                                    ${isRank2 ? "items-center md:items-end" : ""}
                                    ${isRank3 ? "items-center md:items-start" : ""}
                                    w-full md:w-auto
                                    /* Mobile: all items order-1 (natural DOM order: 1, 2, 3) */
                                    order-1
                                    /* Desktop: override order */
                                    md:flex-1
                                    ${isRank2 ? "md:order-1" : ""}
                                    ${isRank1 ? "md:order-2" : ""}
                                    ${isRank3 ? "md:order-3" : ""}
                                `}
                            >
                                <div>
                                    {/* Floating animation */}
                                    <motion.div
                                        animate={{ y: [-4, 4, -4] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        {shouldLoad ? (
                                            <img
                                                src={getSrc(item.img)}
                                                alt={item.label}
                                                loading="lazy"
                                                className={`
                                                object-contain
                                                w-52
                                                ${isRank1 ? "md:w-80" : "md:w-64"}
                                            `}
                                            />
                                        ) : (
                                            <div className={`
                                            w-52 h-48 bg-gray-100 animate-pulse rounded-lg
                                            ${isRank1 ? "md:w-80 md:h-72" : "md:w-64 md:h-56"}
                                        `} />
                                        )}
                                    </motion.div>

                                    {/* TEXT */}
                                    <p className="mt-4 text-lg font-semibold text-center">
                                        {item.label}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}