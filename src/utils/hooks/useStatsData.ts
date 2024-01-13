import { auth, db } from "@/firebase/config";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MatchData from "../interfaces/matchData";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";

const useStatsData: () => [MatchData[], string] = () => {
  try {
    const [user] = useAuthState(auth);

    const matchesCollection = collection(db, user!.uid);

    const [matches, loading] = useCollectionData(matchesCollection);

    const transformedMatches = matches as MatchData[];

    return [transformedMatches, ""];
  } catch (error) {
    console.log("Error" + error);
    return [[], error as string];
  }
};

export default useStatsData;
