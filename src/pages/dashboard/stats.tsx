import useStatsData from "@/utils/hooks/useStatsData";
import classes from "../../styles/Pages/stats.module.scss";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import MatchData from "@/utils/interfaces/matchData";
import StatsData from "@/utils/interfaces/statsData";
import { getStats } from "@/utils/functions/getStats";

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

  return <div className={classes.stats}>STATS</div>;
}
