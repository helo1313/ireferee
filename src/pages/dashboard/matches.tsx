import MatchTable from "@/components/match/MatchTable";
import classes from "../../styles/Pages/matches.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import MatchTableHeader from "@/components/match/MatchTableHeader";

export default function Matches() {
  const [user] = useAuthState(auth);

  return (
    <div className={classes.matches}>
      <h2>My matches</h2>
      <MatchTableHeader />

      {user && <MatchTable user={user.uid} />}
    </div>
  );
}
