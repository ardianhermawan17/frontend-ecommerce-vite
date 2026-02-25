import { motion } from 'framer-motion';
import type { Variants, Transition } from "framer-motion";
import heroImg from '@feature/promotion/assets/competition-section/competition-background.png';
import winnerImg from '@feature/promotion/assets/competition-section/competition-winner.png'
import {useCompetitionSection} from "@feature/promotion/components/competition-section/use-competition-section.ts";
import styles from './competition-section.module.css';
import {getSrc} from "@feature/promotion/utils";

export function CompetitionSection() {
    const {
        ref,
        isVisible,
        shouldLoad
    } = useCompetitionSection();

    const heroSrc = getSrc(heroImg);
    const winnerSrc = getSrc(winnerImg);

    // Motion variants
    const textVariantTransition: Transition = {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // ease-out
    };

    const imageVariantTransition: Transition = {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // ease-out
    };


    const textVariant: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: textVariantTransition },
    };
    const imageVariant: Variants = {
        hidden: { opacity: 0, scale: 0.98, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: imageVariantTransition },
    };

    return (
        <section
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={ref as any}
            aria-label="Promotion - Competition"
            className={`competition-section bg-cover bg-center ${styles.competitionBg || ''}`}
            style={
                !styles.competitionBg
                    ? { backgroundImage: `url(${heroSrc})` }
                    : undefined
            }
        >
            <div className="container mx-auto px-4 w-full md:w-10/12">
                <div className="grid grid-cols-12 items-center gap-6">
                    {/* text area */}
                    <motion.div
                        className="col-span-12 md:col-span-6 order-2 md:order-1"
                        variants={textVariant}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        <h1 className="text-5xl lg:text-6xl text-white text-center md:text-left font-extrabold leading-tight mb-4">
                            Triv Trading Competition
                        </h1>
                        <p className="text-white text-center md:text-left mb-6 max-w-xl">
                            <span className="block text-xl md:text-2xl">
                                Calling all Investor and Trader — Karena
                            </span>
                            <span className="block mt-1 font-bold italic text-2xl md:text-3xl">#SemuaBisaMenang.
                            </span>
                        </p>

                        <div className="flex flex-col gap-6">
                            <a
                                href="https://triv.co.id/id/register"
                                className="w-full md:w-50 inline-flex justify-center md:justify-start items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center md:text-left rounded-md font-semibold shadow"
                                role="button"
                            >
                                Daftar Sekarang &nbsp; &gt;
                            </a>
                            <p className="text-lg text-center md:text-left italic text-yellow-200" >
                                *Periode: 20 Juni - 20 Juli 2022
                            </p>
                        </div>
                    </motion.div>

                    {/* image area */}
                    <motion.div
                        className="col-span-12 md:col-span-6 mb-4 md:mb-0 order-1 md:order-2 flex justify-center md:justify-end"
                        variants={imageVariant}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        {shouldLoad ? (
                            <img
                                src={winnerSrc}
                                alt=""
                                loading="lazy"
                                className="max-w-full w-130 object-contain rounded-lg"
                                width={520}
                                height={360}
                                // style={{ transform: 'translateZ(0)' }} // hint to promote to own layer
                            />
                        ) : (
                            <div className="w-130 h-90 bg-gray-100 animate-pulse rounded-lg" />
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}