import { useParams } from "next/navigation";
import classes from "../../../../styles/Pages/view/matchView.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import MatchData from "@/utils/interfaces/matchData";

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
      {data?.homeTeam} vs {data?.awayTeam}
    </>
  );

  return (
    <div className={classes.matchView}>
      {isLoadingData && loadingContent}
      {!isLoadingData && previewContent}
    </div>
  );
}
