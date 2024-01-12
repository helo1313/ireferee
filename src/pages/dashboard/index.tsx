import Button from "@/components/ui/button/Button";
import classes from "../../styles/Pages/dashboard.module.scss";
import { useRouter } from "next/router";
import {
  CREATE_MATCH_ROUTE,
  MATCHES_ROUTE,
  STATS_ROUTE,
} from "@/utils/constants/routes";

export default function Dashboard() {
  const router = useRouter();

  const onViewMyStatsClicked = () => {
    router.push(STATS_ROUTE);
  };
  const onViewMyMatchesClicked = () => {
    router.push(MATCHES_ROUTE);
  };
  const onCreateNewMatchClicked = () => {
    router.push(CREATE_MATCH_ROUTE);
  };

  return (
    <div className={classes.dashboard}>
      <h2>Welcome back!</h2>
      <p>What would you like to do?</p>
      <div className={classes.actions}>
        <Button styleType="primary" onClick={onCreateNewMatchClicked}>
          Create new matches
        </Button>
        <Button styleType="primary" onClick={onViewMyMatchesClicked}>
          View my matches
        </Button>
        <Button styleType="primary" onClick={onViewMyStatsClicked}>
          View my stats
        </Button>
      </div>
    </div>
  );
}
