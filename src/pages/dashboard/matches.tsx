import MatchTable from "@/components/match/MatchTable";
import classes from "../../styles/Pages/matches.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import MatchTableHeader from "@/components/match/MatchTableHeader";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/router";
import { CREATE_MATCH_ROUTE } from "@/utils/constants/routes";

export default function Matches() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const onCreateNewMatch = () => {
    router.push(CREATE_MATCH_ROUTE);
  };

  return (
    <div className={classes.matches}>
      <header className={classes.header}>
        <h2>My matches</h2>
        <Button styleType="primary" onClick={onCreateNewMatch}>
          Create new match
        </Button>
      </header>

      <MatchTableHeader />

      {user && <MatchTable user={user.uid} />}
    </div>
  );
}
