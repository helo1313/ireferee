import MatchData from "@/utils/interfaces/matchData";
import classes from "./matchTable.module.scss";
import MatchRow from "./MatchRow";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect } from "react";
import dynamic from "next/dynamic";

interface MatchTableData {
  user: string;
}

const MatchTable: React.FC<MatchTableData> = ({ user }) => {
  const matchesCollection = collection(db, user);

  const [matches, loading] = useCollectionData(matchesCollection);

  const transformedMatches = matches as MatchData[];

  return (
    <div className={classes.matchRow}>
      {loading && <p>Loading data...</p>}
      {transformedMatches &&
        transformedMatches.map((match) => {
          return <MatchRow key={match.id} data={match} />;
        })}
    </div>
  );
};

//export default MatchTable;
export default dynamic(() => Promise.resolve(MatchTable), { ssr: false });
