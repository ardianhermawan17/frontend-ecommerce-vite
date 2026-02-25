import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import prizeImg from "@feature/promotion/assets/banner-reward-section/banner-reward-prize.png"
import {useBannerRewardSection} from "@feature/promotion/components/banner-reward-section/use-banner-reward-section.ts";
import {getSrc} from "@feature/promotion/utils";

export function BannerRewardSection() {
    const {
        ref,
        isVisible,
        shouldLoad
    } = useBannerRewardSection();

    const prizeSrc = getSrc(prizeImg);

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
            aria-label="Promotion - Banner Reward"
            className="banner-reward-section mt-12"
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
                        <p className="dark:text-white text-black text-center md:text-left mb-6 max-w-xl">
                            <span className="block mt-1 font-bold text-2xl md:text-3xl">#SemuaBisaMenang karena semakin banyak kamu trading semakin banyak hadiah yang bisa kamu dapatkan !
                            </span>
                        </p>

                        <p className="text-lg text-center md:text-left text-gray-400 " >
                            Mulai trading hanya dengan 50rb rupiah di Triv dan dapatkan hadiahnya.
                        </p>
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
                                src={prizeSrc}
                                alt=""
                                loading="lazy"
                                className="max-w-full w-[620px] object-contain rounded-lg "
                                width={620}
                                height={460}
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