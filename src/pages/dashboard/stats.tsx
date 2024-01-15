import useStatsData from "@/utils/hooks/useStatsData";
import classes from "../../styles/Pages/stats.module.scss";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import MatchData from "@/utils/interfaces/matchData";
import StatsData from "@/utils/interfaces/statsData";
import { getStats } from "@/utils/functions/getStats";
import Stat from "@/components/stats/Stat";
import { GiGoalKeeper, GiSoccerBall, GiCardJoker } from "react-icons/gi";
import { TbSoccerField } from "react-icons/tb";
import { FaRunning } from "react-icons/fa";
import StarRatingDisplay from "@/components/starRating/StarRatingDisplay";

import prepareRoleChartData from "@/utils/functions/prepareRoleChartData";
import prepareCompetitionChartData from "@/utils/functions/prepareCompetitionChartData";
import prepareAgeCategoryChartData from "@/utils/functions/prepareAgeCategoryChartData";
import Chart from "@/components/chart/Chart";
import AuthProvider from "@/components/auth/authProvider";

export default function Stats() {
  const [statsData, setStatsData] = useState<StatsData | undefined>(undefined);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchMatches();
  }, [user]);

  const fetchMatches = async () => {
    if (!user) {
      return;
    }

    const collectionRef = collection(db, user.uid);
    const querySnapshot = await getDocs(collectionRef);

    let data: MatchData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as MatchData);
    });

    setStatsData(getStats(data));
  };

  const roleChartData = prepareRoleChartData(statsData!);
  const competitionChartData = prepareCompetitionChartData(statsData!);
  const ageCategoryChartData = prepareAgeCategoryChartData(statsData!);

  return (
    <AuthProvider>
      {statsData && (
        <div className={classes.stats}>
          <div className={classes.statsContainer}>
            <Stat
              label="Total matches"
              value={(
                statsData.totalMatches.referee +
                statsData.totalMatches.assistantRefeere
              ).toFixed()}
            >
              <TbSoccerField />
            </Stat>
            <Stat label="Total goals" value={statsData.totalGoals.toFixed()}>
              <GiSoccerBall />
            </Stat>

            <Stat
              label="Most goals"
              value={statsData.mostGoalsInSingleMatch.toFixed()}
            >
              <GiSoccerBall />
            </Stat>
            <Stat label="Average goals" value={statsData.avgGoals.toFixed(2)}>
              <GiSoccerBall />
            </Stat>

            <Stat
              label="Total Yellow Cards"
              value={statsData.totalYellowCards.toFixed()}
            >
              <GiCardJoker />
            </Stat>
            <Stat
              label="Average Yellow Cards"
              value={statsData.avgYellowCards.toFixed(2)}
            >
              <GiCardJoker />
            </Stat>

            <Stat
              label="Total Red Cards"
              value={statsData.totalRedCards.toFixed()}
            >
              <GiCardJoker />
            </Stat>
            <Stat
              label="Average Red Cards"
              value={statsData.avgRedCards.toFixed(2)}
            >
              <GiCardJoker />
            </Stat>

            <Stat label="Total penalty" value="0">
              <GiGoalKeeper />
            </Stat>
            <Stat label="Average penalty" value="0">
              <GiGoalKeeper />
            </Stat>

            <Stat
              label="Total distance covered"
              value={statsData.totalDistance.toFixed(2) + "km"}
            >
              <FaRunning />
            </Stat>
            <Stat
              label="Average distance covered"
              value={statsData.avgDistance.toFixed(2) + "km"}
            >
              <FaRunning />
            </Stat>

            <div className={classes.avgPerformance}>
              <StarRatingDisplay value={statsData.avgPerformance} />
              <p>Average performance rating</p>
            </div>
          </div>
          <div className={classes.chartsContainer}>
            <Chart label="Role division" data={roleChartData} />
            <Chart label="Competition division" data={competitionChartData} />
            <Chart label="Age category division" data={ageCategoryChartData} />
          </div>
        </div>
      )}
    </AuthProvider>
  );
}
