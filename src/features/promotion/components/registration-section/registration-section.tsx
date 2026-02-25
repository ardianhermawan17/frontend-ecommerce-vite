import { motion } from 'framer-motion';
import type { Variants, Transition } from "framer-motion";
import heroImg from '@feature/promotion/assets/registration-section/background.png';
import registrationImg from '@feature/promotion/assets/registration-section/registration.png'
import {useRegistrationSection} from "@feature/promotion/components/registration-section/use-registration-section.ts";
import styles from './registration-section.module.css';
import {getSrc} from "@feature/promotion/utils";

export function RegistrationSection() {
    const {
        ref,
        isVisible,
        shouldLoad
    } = useRegistrationSection();

    const heroSrc = getSrc(heroImg);
    const winnerSrc = getSrc(registrationImg);

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
            aria-label="Promotion - Registration"
            className={`registration-section mt-12 bg-cover bg-center ${styles.competitionBg || ''}`}
            style={
                !styles.competitionBg
                    ? { backgroundImage: `url(${heroSrc})` }
                    : undefined
            }
        >
            <div className="mx-0 px-0 w-full">
                <div className="grid grid-cols-12 items-center">
                    {/* text area */}
                    <motion.div
                        className="col-span-12 md:col-span-6 order-1 px-8 md:px-12"
                        variants={textVariant}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        <h1 className="text-5xl lg:text-6xl text-white text-center md:text-left font-extrabold leading-tight mb-4">
                            Cara Pendafataran
                        </h1>
                        <p className="text-white text-center md:text-left mb-6 max-w-xl">
                            <span className="block text-xl md:text-2xl">
                                Cukup Memiliki Akun Triv dan Trading di Triv Selama Durasi Event
                            </span>
                        </p>

                        <div className="flex flex-col gap-6">
                            <a
                                href="https://triv.co.id/id/register"
                                className="w-full md:w-[200px] inline-flex justify-center md:justify-start items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center md:text-left rounded-md font-semibold shadow"
                                role="button"
                            >
                                Daftar Sekarang &nbsp; &gt;
                            </a>
                        </div>
                    </motion.div>

                    {/* image area */}
                    <motion.div
                        className="col-span-12 md:col-span-6 mb-4 md:mb-0 py-12 md:py-0 order-2 flex justify-center md:justify-end"
                        variants={imageVariant}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                    >
                        {shouldLoad ? (
                            <img
                                src={winnerSrc}
                                alt=""
                                loading="lazy"
                                className="max-w-full w-[580px] object-contain rounded-lg"
                                width={580}
                                height={420}
                                // style={{ transform: 'translateZ(0)' }} // hint to promote to own layer
                            />
                        ) : (
                            <div className="w-[520px] h-[360px] bg-gray-100 animate-pulse rounded-lg" />
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}