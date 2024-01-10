import { useParams } from "next/navigation";
import classes from "../../../../styles/Pages/view/matchView.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import MatchData from "@/utils/interfaces/matchData";
import Warning from "@/components/ui/warning/Warning";
import { GiGoalKeeper } from "react-icons/gi";
import { GiCardJoker } from "react-icons/gi";

export default function MatchView() {
  const router = useRouter();
  const { userid, id } = router.query;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState<MatchData | undefined>();

  useEffect(() => {
    fetchMatchData();
  }, [userid, id]);

  const fetchMatchData = async () => {
    if (!userid || !id) {
      return;
    }

    setIsLoadingData(true);

    const docRef = doc(db, userid as string, id as string);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    setData(docData as MatchData);
    setIsLoadingData(false);
  };

  const loadingContent = <p>Loading...</p>;

  const previewContent = (
    <>
      {data?.status !== "Finished" && (
        <Warning>This match is not finished yet.</Warning>
      )}

      <p className={classes.date}>{data?.date}</p>
      <p className={classes.competition}>{data?.competition}</p>

      <div className={classes.teams}>
        <p className={classes.homeTeam}>{data?.homeTeam}</p>
        <p>vs</p>
        <p className={classes.awayTeam}>{data?.awayTeam}</p>
      </div>

      {data?.status === "Finished" && (
        <>
          <div className={classes.score}>
            <p className={classes.homeTeam}>{data?.homeScore}</p>
            <p>-</p>
            <p className={classes.awayTeam}>{data?.awayScore}</p>
          </div>

          <p className={classes.sectionName}>Match overview</p>
          <div className={classes.matchStatsContainer}>
            <div className={classes.matchStats}>
              <GiGoalKeeper />
              <div className={classes.matchStatsData}>
                <p className={classes.value}>0</p>
                <p className={classes.desc}>Penalty</p>
              </div>
            </div>
            <div className={`${classes.matchStats} ${classes.yellow}`}>
              <GiCardJoker />
              <div className={classes.matchStatsData}>
                <p className={classes.value}>{data?.yellowCards}</p>
                <p className={classes.desc}>Yellow Cards</p>
              </div>
            </div>
            <div className={`${classes.matchStats} ${classes.red}`}>
              <GiCardJoker />
              <div className={classes.matchStatsData}>
                <p className={classes.value}>{data?.redCards}</p>
                <p className={classes.desc}>Red Cards</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className={classes.matchView}>
      {isLoadingData && loadingContent}
      {!isLoadingData && previewContent}
    </div>
  );
}