import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from 'isomorphic-dompurify';
import styles from "./rules-section.module.css";
import {Card, CardContent} from "@shared/components/ui/card.tsx";
import {useRulesSection} from "@feature/promotion/components/rules-section/use-rules-section.ts";


export function RulesSection() {
    const { cards, toggle, isExpanded } = useRulesSection();

    const chevronVariants = {
        collapsed: { rotate: 0 },
        expanded: { rotate: 90 },
    };

    return (
        <section className="py-16" aria-label="Peraturan Kompetisi">
            <div className="container mx-auto px-4">
                {/* TITLE */}
                <div className="text-center mb-24">
                  <span className="text-3xl md:text-4xl font-bold uppercase border-b-[16px] border-blue-600">
                    PERATURAN KOMPETISI
                  </span>
                </div>

                {/* CARDS LIST */}
                <div className="grid gap-4">
                    {cards.map((card) => {
                        const expanded = isExpanded(card.id);

                        return (
                            <motion.div
                                key={card.id}
                                className="w-full my-2 "
                                layout
                                initial={false}
                            >
                                <Card className="overflow-visible bg-blue-500 dark:bg-transparent">
                                    <CardContent className="p-0">
                                        {/* header row (left title, right chevron) - clicking either toggles */}
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => toggle(card.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") toggle(card.id);
                                            }}
                                            aria-expanded={expanded}
                                            className={`flex items-center justify-between p-4 md:p-6 ${styles.cardHeader}`}
                                        >
                                            <div className="flex-1 mb-2 md:mb-6">
                                                <div className="text-xl md:text-2xl font-semibold text-white">
                                                    {card.title}
                                                </div>
                                            </div>

                                            <motion.div
                                                className="ml-4"
                                                variants={chevronVariants}
                                                animate={expanded ? "expanded" : "collapsed"}
                                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                                aria-hidden
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="dark:text-gray-600 text-white"
                                                >
                                                    <path
                                                        d="M9 6l6 6-6 6"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </motion.div>
                                        </div>

                                        {/* animate presence for content */}
                                        <AnimatePresence initial={false}>
                                            {expanded && (
                                                <motion.div
                                                    key="content"
                                                    layout
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                                >
                                                    <div className="px-4 md:px-6 pb-4 md:pb-6 text-white">
                                                        {card.listType === "number" ? (
                                                            <ul className="list-none space-y-2 ">
                                                                {card.rules.map((r, index) => {
                                                                    const rawHtml = (r.text || '').replace(/className=/g, 'class=');
                                                                    const clean = DOMPurify.sanitize(rawHtml);

                                                                    return (
                                                                        <li key={r.id} className="text-lg md:text-xl flex items-start gap-2">
                                                                            <span className="font-semibold mr-1">{index + 1}.</span>
                                                                            <div dangerouslySetInnerHTML={{ __html: clean }}/>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        ) : (
                                                            <ul className="list-none space-y-2  ruleListStar">
                                                                {card.rules.map((r) => {
                                                                    const rawHtml = (r.text || '').replace(/className=/g, 'class=');
                                                                    const clean = DOMPurify.sanitize(rawHtml);

                                                                    return (
                                                                        <li key={r.id} className="text-lg md:text-xl flex items-start gap-2">
                                                                            <span className="font-semibold mr-1">*</span>
                                                                            <div dangerouslySetInnerHTML={{ __html: clean }} />
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}