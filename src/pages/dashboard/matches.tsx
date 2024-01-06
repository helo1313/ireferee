import MatchTable from "@/components/match/MatchTable";
import classes from "../../styles/Pages/matches.module.scss";

export default function Matches() {
  return (
    <div className={classes.matches}>
      <h2>My matches</h2>
      <MatchTable />
    </div>
  );
}
