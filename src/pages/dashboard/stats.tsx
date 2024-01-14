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
import { GiGoalKeeper } from "react-icons/gi";
import StarRatingDisplay from "@/components/starRating/StarRatingDisplay";

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

  console.log(statsData);

  return (
    statsData && (
      <div className={classes.stats}>
        <div className={classes.statsContainer}>
          <Stat
            label="Total matches"
            value={(
              statsData.totalMatches.refeere +
              statsData.totalMatches.assistantRefeere
            ).toFixed()}
          >
            <GiGoalKeeper />
          </Stat>
          <Stat label="Total goals" value={statsData.totalGoals.toFixed()}>
            <GiGoalKeeper />
          </Stat>

          <Stat
            label="Most goals"
            value={statsData.mostGoalsInSingleMatch.toFixed()}
          >
            <GiGoalKeeper />
          </Stat>
          <Stat label="Average goals" value={statsData.avgGoals.toFixed(2)}>
            <GiGoalKeeper />
          </Stat>

          <Stat
            label="Total Yellow Cards"
            value={statsData.totalYellowCards.toFixed()}
          >
            <GiGoalKeeper />
          </Stat>
          <Stat
            label="Average Yellow Cards"
            value={statsData.avgYellowCards.toFixed(2)}
          >
            <GiGoalKeeper />
          </Stat>

          <Stat
            label="Total Red Cards"
            value={statsData.totalRedCards.toFixed()}
          >
            <GiGoalKeeper />
          </Stat>
          <Stat
            label="Average Red Cards"
            value={statsData.avgRedCards.toFixed(2)}
          >
            <GiGoalKeeper />
          </Stat>

          <Stat label="Total penalty" value="0">
            <GiGoalKeeper />
          </Stat>
          <Stat label="Average penalty" value="0">
            <GiGoalKeeper />
          </Stat>

          <Stat
            label="Total distance covered"
            value={statsData.totalDistance.toFixed(2)}
          >
            <GiGoalKeeper />
          </Stat>
          <Stat
            label="Average distance covered"
            value={statsData.avgDistance.toFixed(2)}
          >
            <GiGoalKeeper />
          </Stat>

          <div className={classes.avgPerformance}>
            <StarRatingDisplay value={statsData.avgPerformance} />
            <p>Average performance rating</p>
          </div>
        </div>
        <div className={classes.graphsContainer}></div>
      </div>
    )
  );
}
