import {motion, type Transition, type Variants} from 'framer-motion';
import {useWeeklyQuestSection} from './use-weekly-quest-section.ts';
import styles from './weekly-quest-section.module.css';

// Adjust these imports to match your asset paths
import weeklyQuestImg from '@feature/promotion/assets/weekly-quest-section/reward-image.png';
import {Card, CardContent} from "@shared/components/ui/card.tsx";
import {getSrc} from "@feature/promotion/utils";

export function WeeklyQuestSection() {
    const {
        ref,
        shouldLoad,
        isVisible
    } = useWeeklyQuestSection();
    const imgSrc = getSrc(weeklyQuestImg);

    const floatTransition = {
        duration: 3.0,
        repeat: Infinity,
        ease: 'easeInOut' as const,
    }

    // Scroll animation variants with ease-out
    const textVariantTransition: Transition = {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // ease-out
    }

    const imageVariantTransition: Transition = {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // ease-out
    }

    const textVariant: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: textVariantTransition },
    }

    const imageVariant: Variants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: imageVariantTransition },
    }

    return (
        <section
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={ref as any}
            aria-label="Weekly Quest"
            className="weekly-quest-section mt-8 py-20"
        >
            <div className="container mx-auto px-12 w-full md:w-10/12">
                <Card className={`${styles.sideQuestBg} overflow-visible`}>
                    <CardContent className={`${styles.sideQuestContent} p-6 md:p-8`}>
                        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">
                            {/* LEFT: clickable text wrapper */}
                            <motion.div
                                className="block flex-1"
                                variants={textVariant}
                                initial="hidden"
                                animate={isVisible ? 'visible' : 'hidden'}
                            >
                                <div className="h-full flex flex-col justify-center text-center md:text-left text-white">
                                    <h3 className="text-3xl md:text-4xl font-bold uppercase">
                                        WEEKLY QUEST JOURNEY
                                    </h3>
                                    <p className="mt-2 text-lg">
                                        Updated every week!!
                                    </p>
                                    <p className="mt-2 text-lg">
                                        Juara Mingguan
                                    </p>
                                    <p className="mt-1 text-2xl md:text-3xl font-semibold">
                                        Total Hadiah 10 juta + Triv Merch
                                    </p>
                                </div>
                            </motion.div>

                            {/* RIGHT: image that overflows left by 40px on desktop */}
                            <motion.div
                                variants={imageVariant}
                                initial="hidden"
                                animate={isVisible ? 'visible' : 'hidden'}
                                className={`w-full md:w-1/3 ${styles.sideQuestImageWrap} flex justify-end`}
                            >
                                <motion.div
                                    className={`${styles.sideQuestImage}`}
                                    animate={{ y: [ -8, 8, -8 ] }}
                                    transition={floatTransition}
                                    style={{ willChange: 'transform' }}
                                >
                                    {shouldLoad ? (
                                        <img
                                            src={imgSrc}
                                            alt="Weekly quest product"
                                            loading="lazy"
                                            className="max-w-[240px] md:max-w-[480px] object-contain"
                                            width={420}
                                            height={480}
                                        />
                                    ) : (
                                        <div className="w-[220px] md:w-[320px] h-[160px] md:h-[220px] bg-gray-100 animate-pulse rounded-lg" />
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}