import { useParams } from "next/navigation";
import classes from "../../../styles/Pages/view/matchView.module.scss";

export default function MatchView() {
  const id = useParams().id;

  return <div className={classes.matchView}>Match preview {id}</div>;
}
