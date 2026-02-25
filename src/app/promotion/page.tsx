import {CompetitionSection} from "@feature/promotion/components/competition-section";
import {BannerRewardSection} from "@feature/promotion/components/banner-reward-section";
import {QuestRewardSection} from "@feature/promotion/components/quest-reward-section/quest-reward-section.tsx";
import {HeroesSection} from "@feature/promotion/components/heroes-section";
import {SideQuestSection} from "@feature/promotion/components/side-quest-section/side-quest-section.tsx";
import {WeeklyQuestSection} from "@feature/promotion/components/weekly-quest-section";
import {RegistrationSection} from "@feature/promotion/components/registration-section";
import {LeaderboardSection} from "@feature/promotion/components/leaderboard-section";
import {RulesSection} from "@feature/promotion/components/rules-section";

export default function Page() {
    return (
        <main className="pb-12">
            <CompetitionSection />
            <BannerRewardSection />
            <QuestRewardSection />
            <HeroesSection />
            <SideQuestSection />
            <WeeklyQuestSection />
            <RegistrationSection />
            <LeaderboardSection />
            <RulesSection />
        </main>
    )
}